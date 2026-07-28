import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import InsuredPeopleTable from "@/components/InsuredPeopleTable";
import {
  FiLogOut,
  FiShield,
  FiCheckCircle,
  FiHeart,
  FiTruck,
  FiBriefcase,
  FiActivity,
  FiMessageCircle,
} from "react-icons/fi";

function normalizePolicyType(raw: string | null | undefined): string {
  if (!raw) return "NINGUNA";
  const clean = raw.trim().toUpperCase().replace(/\s+/g, "_");
  const map: Record<string, string> = {
    VIDA_GRUPO: "VIDA_GRUPO",
    "VIDA GRUPO": "VIDA_GRUPO",
    VIDA_INDIVIDUAL: "VIDA_INDIVIDUAL",
    "VIDA INDIVIDUAL": "VIDA_INDIVIDUAL",
    SALUD: "SALUD",
    GENERALES: "GENERALES",
    ARL: "ARL",
    PENSIONES: "PENSIONES",
    NINGUNA: "NINGUNA",
  };
  return map[clean] || map[raw.trim()] || "NINGUNA";
}

export const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [policyType, setPolicyType] = useState<string | null>(null);
  const [policies, setPolicies] = useState<{ id: string; clientUid: string; policyType: string }[]>([]);
  const [insuredPeople, setInsuredPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (u: User) => {
    try {
      // 1. Read user document for policyType
      const userRef = doc(db, "users", u.uid);
      const userSnap = await getDoc(userRef);
      let pType = "NINGUNA";
      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("[ABP DEBUG] users/{uid} data:", userData);
        const possibleFields = ["policyType", "assignedPolicyType", "tipoPoliza", "tipoDePoliza", "ramo", "branch"];
        for (const field of possibleFields) {
          if (userData[field]) {
            pType = normalizePolicyType(userData[field]);
            console.log(`[ABP DEBUG] Found policyType in users/{uid}.${field} = ${userData[field]} -> ${pType}`);
            break;
          }
        }
        if (pType === "NINGUNA") {
          console.log("[ABP DEBUG] No policyType field found in users/{uid}. Fields:", Object.keys(userData));
        }
      } else {
        console.log("[ABP DEBUG] users/{uid} document does not exist for", u.uid);
      }

      // 2. Try reading from company membership as fallback
      if (pType === "NINGUNA") {
        try {
          const membershipRef = doc(db, "companies", "abp", "memberships", u.uid);
          const membershipSnap = await getDoc(membershipRef);
          if (membershipSnap.exists()) {
            const memData = membershipSnap.data();
            console.log("[ABP DEBUG] memberships/{uid} data:", memData);
            const possibleMemFields = ["policyType", "assignedPolicyType", "tipoPoliza", "tipoDePoliza", "ramo", "branch"];
            for (const field of possibleMemFields) {
              if (memData[field]) {
                pType = normalizePolicyType(memData[field]);
                console.log(`[ABP DEBUG] Found policyType in memberships/{uid}.${field} = ${memData[field]} -> ${pType}`);
                break;
              }
            }
            if (pType === "NINGUNA") {
              console.log("[ABP DEBUG] No policyType field found in memberships/{uid}. Fields:", Object.keys(memData));
            }
          } else {
            console.log("[ABP DEBUG] memberships/{uid} document does not exist for", u.uid);
          }
        } catch (err) {
          console.log("[ABP DEBUG] Error reading memberships/{uid}:", err);
        }
      }

      // 3. Query only the collection allowed by the current Firestore rules.
      // Prefer the stable Auth UID and use the email only for legacy records.
      const qUid = query(collection(db, "clientPolicies"), where("clientUid", "==", u.uid));
      const snapUid = await getDocs(qUid);
      const allPols = snapUid.docs.map((d) => ({ id: d.id, ...d.data() } as any));

      setPolicies(allPols);
      console.log("[ABP DEBUG] Total unique policies found:", allPols.length, allPols.map(p => ({ id: p.id, policyType: p.policyType, clientUid: p.clientUid, clientEmail: p.clientEmail })));

      // 4. Derive policy type from found policies if still missing
      if (pType === "NINGUNA" && allPols.length > 0) {
        const polPolicyType = allPols[0].policyType || allPols[0].tipoPoliza || allPols[0].ramo || allPols[0].branch;
        if (polPolicyType) {
          pType = normalizePolicyType(polPolicyType);
          console.log("[ABP DEBUG] Derived policyType from clientPolicies:", polPolicyType, "->", pType);
        }
      }

      console.log("[ABP DEBUG] Final policyType:", pType);
      setPolicyType(pType);

      // 5. Load insured people for VIDA policies
      if ((pType === "VIDA_GRUPO" || pType === "VIDA_INDIVIDUAL") && allPols.length > 0) {
        const first = allPols[0];
        const insCol = collection(db, "clientPolicies", first.id, "insuredPeople");
        const insSnap = await getDocs(insCol);
        const people = insSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        console.log("[ABP DEBUG] Insured people count:", people.length);
        setInsuredPeople(people);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setCurrentUser(u);
      if (!u) {
        setLoading(false);
        navigate("/login-clientes");
        return;
      }
      await loadData(u);
    });
    return unsub;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login-clientes");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 border-2 border-slate-300 border-t-abp-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) return null;

  const labelByType: Record<string, string> = {
    VIDA_INDIVIDUAL: "Vida Individual",
    VIDA_GRUPO: "Vida Grupo",
    SALUD: "Salud",
    GENERALES: "Generales (Auto/Hogar)",
    ARL: "ARL",
    PENSIONES: "Pensiones",
    NINGUNA: "General",
  };

  const iconByType: Record<string, React.ReactNode> = {
    VIDA_INDIVIDUAL: <FiHeart className="h-5 w-5 text-abp-gold" />,
    VIDA_GRUPO: <FiHeart className="h-5 w-5 text-abp-gold" />,
    SALUD: <FiActivity className="h-5 w-5 text-abp-gold" />,
    GENERALES: <FiTruck className="h-5 w-5 text-abp-gold" />,
    ARL: <FiBriefcase className="h-5 w-5 text-abp-gold" />,
    PENSIONES: <FiBriefcase className="h-5 w-5 text-abp-gold" />,
    NINGUNA: <FiShield className="h-5 w-5 text-abp-gold" />,
  };

  const typeLabel = labelByType[policyType || "NINGUNA"];
  const typeIcon = iconByType[policyType || "NINGUNA"];

  return (
    <div className="flex-1 bg-slate-50 px-4 sm:px-8 lg:px-12 pt-24 pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Hola, {currentUser.displayName || "Cliente"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {typeIcon}
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Póliza: {typeLabel}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition"
          >
            <FiLogOut className="h-4 w-4" />
            Salir
          </button>
        </div>

        {/* Mis pólizas */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider">Mi póliza</h2>
          </div>
          <div className="divide-y divide-slate-200">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {typeIcon}
                <div>
                  <p className="text-sm font-medium text-slate-800">Seguro de {typeLabel}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Activa · Vence el 31/12/2025</p>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-600">Activa</span>
            </div>
          </div>
        </section>

        {/* Funcionalidad específica según tipo */}
        {(policyType === "VIDA_INDIVIDUAL" || policyType === "VIDA_GRUPO") && policies.length > 0 && (
          <InsuredPeopleTable
            policyId={policies[0].id}
            people={insuredPeople}
            clientUid={currentUser.uid}
            clientEmail={currentUser.email}
            clientName={currentUser.displayName}
            onChange={() => {
              if (currentUser) loadData(currentUser);
            }}
          />
        )}

        {policyType === "SALUD" && (
          <section className="mb-10">
            <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider mb-4">Cobertura activa</h2>
            <div className="divide-y divide-slate-200">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Hospitalización</p>
                  <p className="text-xs text-slate-400">Cobertura nacional</p>
                </div>
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Consulta general</p>
                  <p className="text-xs text-slate-400">Sin copago</p>
                </div>
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Medicamentos</p>
                  <p className="text-xs text-slate-400">80% de cobertura</p>
                </div>
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </section>
        )}

        {policyType === "GENERALES" && (
          <section className="mb-10">
            <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider mb-4">Vehículos asegurados</h2>
            <div className="divide-y divide-slate-200">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Mazda CX-5</p>
                  <p className="text-xs text-slate-400">Placa: ABC-123 · Todo Riesgo</p>
                </div>
                <span className="text-xs font-medium text-emerald-600">Activa</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Toyota Corolla</p>
                  <p className="text-xs text-slate-400">Placa: XYZ-789 · SOAT</p>
                </div>
                <span className="text-xs font-medium text-emerald-600">Activa</span>
              </div>
            </div>
          </section>
        )}

        {policyType === "ARL" && (
          <section className="mb-10">
            <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider mb-4">Trabajadores protegidos</h2>
            <div className="divide-y divide-slate-200">
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Empleados activos: 24</p>
                  <p className="text-xs text-slate-400">Clase de riesgo: II</p>
                </div>
                <span className="text-xs font-medium text-emerald-600">Cumplido</span>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-slate-800">Última nómina registrada</p>
                  <p className="text-xs text-slate-400">Junio 2025</p>
                </div>
                <FiCheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </section>
        )}

        {/* Acciones */}
        <section>
          <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider mb-4">Contacto</h2>
          <a
            href="https://wa.me/573135707125"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <FiMessageCircle className="h-4 w-4" />
            Contactar asesor · 313 570 7125
          </a>
        </section>
      </div>
    </div>
  );
};
