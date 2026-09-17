import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiUserMinus,
  FiClock,
  FiCheckCircle,
  FiShield,
  FiLogOut,
  FiMessageCircle,
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { auth, db } from "@/lib/firebase";
import {
  policyLabel,
  policyType,
  type InsuredPerson,
  type PortalView,
} from "@/lib/clientPortal";
import InsuredPeopleTable from "@/components/InsuredPeopleTable";
import logo from "@/assets/Logo profesional.webp";

type Policy = Record<string, unknown> & { id: string };
const sections = [
  {
    id: "overview",
    label: "Resumen",
    icon: FiGrid,
    description: "Tus pólizas y lo que necesitas revisar.",
  },
  {
    id: "people",
    label: "Asegurados",
    icon: FiUsers,
    description: "Consulta, vincula y actualiza a las personas de tu póliza.",
  },
  {
    id: "withdrawn",
    label: "Retirados",
    icon: FiUserMinus,
    description: "Consulta los asegurados retirados y sus datos.",
  },
  {
    id: "history",
    label: "Novedades",
    icon: FiClock,
    description: "Consulta los movimientos registrados y su estado.",
  },
  {
    id: "confirmation",
    label: "Confirmación mensual",
    icon: FiCheckCircle,
    description: "Revisa los datos guardados antes de confirmar el mes.",
  },
] as const;
const textField = (p: Record<string, unknown>, ...keys: string[]) =>
  keys
    .map((key) => p[key])
    .find((value) => typeof value === "string" && value.trim()) as string | undefined;

export const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const section =
    sections.find((item) => item.id === params.get("seccion")) || sections[0];
  const [user, setUser] = useState<User | null>(null);
  const [profileName, setProfileName] = useState("");
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [fallbackType, setFallbackType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    window.localStorage.getItem("abp-client-sidebar-collapsed") === "true",
  );
  const [busy, setBusy] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [people, setPeople] = useState<InsuredPerson[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleError, setPeopleError] = useState("");
  const [peopleRevision, setPeopleRevision] = useState(0);
  const selected =
    policies.find((p) => p.id === params.get("poliza")) || policies[0];
  const clientName = profileName || user?.displayName?.trim() || "";
  const selectedType = selected
    ? policyType(selected) || (policies.length === 1 ? fallbackType : "")
    : "";
  // Vida y salud gestionan asegurados; los demás ramos muestran sus datos propios.
  const hasPeople = ["VIDA_GRUPO", "VIDA_INDIVIDUAL", "SALUD"].includes(selectedType);
  const requestedPeople = useRef("");
  const selectedId = selected?.id;
  const userId = user?.uid;

  useEffect(() => {
    window.localStorage.setItem(
      "abp-client-sidebar-collapsed",
      String(sidebarCollapsed),
    );
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    let active = true;
    let generation = 0;
    const unsubscribe = onAuthStateChanged(auth, async (current) => {
      const request = ++generation;
      setUser(current);
      setProfileName("");
      setFallbackType("");
      setPolicies([]);
      setLoading(true);
      setError("");
      setBusy(false);
      if (!current) {
        navigate("/login-clientes", { replace: true });
        return;
      }
      try {
        const snapshot = await getDocs(
          query(
            collection(db, "clientPolicies"),
            where("clientUid", "==", current.uid),
          ),
        );
        const result = snapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        // Optional profile data must not block access to the client's policies.
        let fallback = "";
        let name = current.displayName?.trim() || "";
        if (!name || (result.length === 1 && !policyType(result[0]))) {
          for (const ref of [
            doc(db, "users", current.uid),
            doc(db, "companies", "abp", "memberships", current.uid),
          ]) {
            try {
              const profile = await getDoc(ref);
              if (profile.exists()) {
                const data = profile.data();
                name ||= textField(data, "clientName", "displayName", "nombreCompleto", "nombre", "name", "razonSocial")?.trim() || "";
                fallback ||= policyType(data);
              }
            } catch {
              /* Optional legacy metadata. */
            }
            if (name && (fallback || result.length !== 1 || policyType(result[0]))) break;
          }
        }
        name ||= result.map((policy) => textField(policy, "clientName", "nombreCliente"))
          .find((value) => value?.trim())?.trim() || "";
        if (active && request === generation) {
          setPolicies(result);
          setProfileName(name);
          setFallbackType(fallback);
        }
      } catch {
        if (active && request === generation)
          setError("No pudimos cargar tus pólizas. Intenta nuevamente.");
      } finally {
        if (active && request === generation) setLoading(false);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate, retry]);

  useEffect(() => {
    let active = true;
    setPeople([]);
    setPeopleError("");
    requestedPeople.current = "";
    if (!selectedId || !hasPeople || !userId) {
      setPeopleLoading(false);
      return;
    }
    setPeopleLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "clientPolicies", selectedId, "insuredPeople"),
      (snapshot) => {
        if (!active) return;
        setPeople(
          snapshot.docs.map(
            (item) => ({ ...item.data(), id: item.id }) as InsuredPerson,
          ),
        );
        requestedPeople.current = selectedId;
        setPeopleLoading(false);
      },
      () => {
        if (active) {
          setPeopleError(
            "No pudimos cargar los asegurados. Tus datos no se han modificado.",
          );
          setPeopleLoading(false);
        }
      },
    );
    return () => {
      active = false;
      unsubscribe();
    };
  }, [selectedId, hasPeople, userId, peopleRevision]);

  const changeView = (view: PortalView) => {
    if (busy) return;
    const next = new URLSearchParams(params);
    next.set("seccion", view);
    setParams(next);
    setMenuOpen(false);
  };
  const logout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/login-clientes", { replace: true });
    } catch {
      setError("No pudimos cerrar la sesión. Intenta nuevamente.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex-1 bg-white text-slate-800">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <span className="font-semibold">ABP · Portal de clientes</span>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="client-sidebar"
          className="rounded-lg border p-2"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>
      {menuOpen && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 top-16 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        id="client-sidebar"
        className={`${menuOpen ? "flex" : "hidden"} fixed bottom-0 left-0 top-16 z-40 w-64 flex-col overflow-hidden border-r border-slate-200 bg-white p-4 text-slate-900 transition-[width] duration-200 lg:top-0 lg:flex ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <div className={`mb-5 flex items-center gap-3 px-2 pt-2 ${sidebarCollapsed ? "lg:flex-col lg:gap-1 lg:px-0" : ""}`}>
          <img
            src={logo}
            alt="ABP Seguros"
            className="h-11 w-11 rounded-xl bg-white object-contain p-1"
          />
          <div className={sidebarCollapsed ? "lg:hidden" : ""}>
            <p className="font-semibold text-slate-900">ABP Seguros</p>
            <p className="mt-1 text-xs text-slate-500">Portal de clientes</p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarCollapsed((value) => !value)}
            aria-label={sidebarCollapsed ? "Expandir menú lateral" : "Recoger menú lateral"}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? "Expandir menú" : "Recoger menú"}
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 lg:flex ${sidebarCollapsed ? "" : "ml-auto"}`}
          >
            <FiMenu />
          </button>
        </div>
        <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
          Mi espacio
        </p>
        <nav aria-label="Navegación del portal" className="space-y-1">
          {sections.map((item) => (
            <button
              key={item.id}
              disabled={busy}
              onClick={() => changeView(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
              aria-current={section.id === item.id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition disabled:opacity-50 ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""} ${section.id === item.id ? "bg-abp-gold text-slate-950 font-semibold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className={sidebarCollapsed ? "lg:hidden" : ""}>{item.label}</span>
            </button>
          ))}
        </nav>
        {busy && (
          <p
            role="status"
            className={`mt-4 px-3 text-xs leading-relaxed text-amber-700 ${sidebarCollapsed ? "lg:hidden" : ""}`}
          >
            Guarda o cancela la operación abierta para cambiar de sección o
            póliza.
          </p>
        )}
        <div className="mt-auto pt-4">
          <a
            href="https://api.whatsapp.com/send?phone=573135707125&text=Hola%2C%20necesito%20ayuda%20con%20el%20portal%20de%20clientes%20de%20ABP."
            target="_blank"
            rel="noopener noreferrer"
            title="Contactar a mi asesor"
            className={`block rounded-xl border border-slate-200 bg-slate-50 p-3 ${sidebarCollapsed ? "lg:flex lg:justify-center" : ""}`}
          >
            <FiMessageCircle className={`text-abp-gold ${sidebarCollapsed ? "lg:mb-0" : "mb-3"}`} />
            <p className={`text-sm font-medium text-slate-900 ${sidebarCollapsed ? "lg:hidden" : ""}`}>Estamos para ayudarte</p>
            <p className={`mt-1 text-xs text-slate-500 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
              Contactar a mi asesor ↗
            </p>
          </a>
          <div className="mt-3 border-t border-slate-200 pt-3">
            <p className={`truncate text-sm text-slate-900 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
              {clientName || "Mi cuenta"}
            </p>
            <p className={`mt-1 truncate text-xs text-slate-500 ${sidebarCollapsed ? "lg:hidden" : ""}`}>
              {user?.email}
            </p>
            <button
              disabled={busy || loggingOut || !user}
              onClick={logout}
              title="Cerrar sesión"
              className={`mt-3 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50 ${sidebarCollapsed ? "lg:w-full lg:justify-center" : ""}`}
            >
              <FiLogOut />
              <span className={sidebarCollapsed ? "lg:hidden" : ""}>
                {loggingOut ? "Cerrando sesión…" : "Cerrar sesión"}
              </span>
            </button>
          </div>
        </div>
      </aside>
      <div className={`min-w-0 transition-[margin] duration-200 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <header className="bg-abp-blue px-5 py-5 text-white sm:px-8 lg:px-10">
          <h1 className="mx-auto max-w-6xl break-words text-xl font-semibold text-white">
            {section.id === "overview"
              ? (clientName ? `Bienvenido, ${clientName}` : "Bienvenido a tu portal")
              : section.label}
          </h1>
        </header>
        <div className="mx-auto max-w-6xl p-5 sm:px-8 sm:py-6 lg:px-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-xl text-sm text-slate-500">
              {section.description}
            </p>
            {selected && policies.length > 1 && (
              <label className="w-full text-xs font-medium text-slate-500 sm:w-64">
                Póliza seleccionada
                <select
                  value={selected.id}
                  disabled={busy}
                  onChange={(event) => {
                    const next = new URLSearchParams(params);
                    next.set("poliza", event.target.value);
                    setParams(next);
                  }}
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 disabled:opacity-50"
                >
                  {policies.map((p, index) => (
                    <option key={p.id} value={p.id}>
                      {policyLabel(
                        policyType(p) ||
                          (policies.length === 1 ? fallbackType : ""),
                      )}{" "}
                      ·{" "}
                      {textField(p, "policyNumber", "numeroPoliza", "number") ||
                        `Póliza ${index + 1}`}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          {error && (
            <div
              role="alert"
              className="mb-5 border-l-2 border-red-300 px-4 py-3 text-sm text-red-800"
            >
              {error}
              <button
                onClick={() => setRetry((value) => value + 1)}
                className="ml-3 rounded-lg bg-abp-blue px-3 py-2 text-sm font-medium text-white hover:bg-abp-navy"
              >
                Reintentar
              </button>
            </div>
          )}
          {loading ? (
            <p
              role="status"
              className="py-10 text-center text-slate-500"
            >
              Cargando tus pólizas…
            </p>
          ) : !selected ? (
            !error && (
              <div className="border-t border-slate-200 py-10 text-center">
                <FiShield className="mx-auto mb-4 h-8 w-8 text-abp-gold" />
                <h2 className="font-semibold">
                  Todavía no tienes pólizas asignadas
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Tu asesor puede ayudarte a vincularlas a tu cuenta.
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=573135707125&text=Hola%2C%20necesito%20ayuda%20con%20mi%20p%C3%B3liza%20en%20el%20portal%20de%20ABP."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-lg bg-abp-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-abp-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-abp-blue"
                >
                  Contactar asesor
                </a>
              </div>
            )
          ) : (
            <>
              {section.id === "overview" && (
                <section className="mb-6 border-y border-slate-200 py-6">
                  <div className="flex items-start gap-4">
                    <div className="py-1 text-amber-700">
                      <FiShield className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">Mi póliza</p>
                      <h2 className="mt-1 text-xl font-semibold">
                        {policyLabel(selectedType)}
                      </h2>
                      {textField(selected, "policyNumber", "numeroPoliza", "number") && (
                        <p className="mt-2 text-xs text-slate-500">
                          Póliza {textField(selected, "policyNumber", "numeroPoliza", "number")}
                        </p>
                      )}
                    </div>
                    {textField(selected, "status", "estado") && (
                      <span className="text-xs text-slate-600">
                        {textField(selected, "status", "estado")}
                      </span>
                    )}
                  </div>
                  {textField(selected, "insurer", "aseguradora") && (
                    <p className="mt-3 text-sm text-slate-500">
                      {textField(selected, "insurer", "aseguradora")}
                    </p>
                  )}
                </section>
              )}
              {hasPeople ? (
                peopleError ? (
                  <div
                    role="alert"
                    className="border-l-2 border-red-300 px-4 py-3 text-sm text-red-800"
                  >
                    {peopleError}
                    <button
                      className="ml-3 rounded-lg bg-abp-blue px-3 py-2 text-sm font-medium text-white hover:bg-abp-navy"
                      onClick={() => setPeopleRevision((value) => value + 1)}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : peopleLoading || requestedPeople.current !== selected.id ? (
                  <p role="status" className="p-8 text-center text-slate-500">
                    Cargando asegurados…
                  </p>
                ) : (
                  <InsuredPeopleTable
                    key={`${user?.uid}-${selected.id}`}
                    policyId={selected.id}
                    people={people}
                    clientUid={user!.uid}
                    clientEmail={user!.email}
                    clientName={clientName || null}
                    view={section.id}
                    onNavigate={changeView}
                    onBusyChange={setBusy}
                    onChange={() => {
                      /* Local state is updated after each committed operation. */
                    }}
                  />
                )
              ) : (
                <div className="border-t border-slate-200 py-6">
                  <h2 className="font-semibold">Datos de tu póliza</h2>
                  <dl className="mt-4 grid gap-3 border-y border-slate-200 py-4 text-sm sm:grid-cols-2">
                    <div><dt className="text-slate-500">Inicio de vigencia</dt><dd className="mt-1 text-slate-900">{textField(selected, "startDate", "vigenciaInicio", "fechaInicio") || "No registrado"}</dd></div>
                    <div><dt className="text-slate-500">Vencimiento</dt><dd className="mt-1 text-slate-900">{textField(selected, "endDate", "vigenciaFin", "fechaFin") || "No registrado"}</dd></div>
                    {selectedType === "ARL" && <div><dt className="text-slate-500">Clase de riesgo</dt><dd className="mt-1 text-slate-900">{textField(selected, "riskClass") || "No registrada"}</dd></div>}
                    {selectedType === "AUTOS" && <><div><dt className="text-slate-500">Placa</dt><dd className="mt-1 text-slate-900">{textField(selected, "plate") || "No registrada"}</dd></div><div><dt className="text-slate-500">Vehículo</dt><dd className="mt-1 text-slate-900">{textField(selected, "vehicle") || "No registrado"}</dd></div></>}
                    {selectedType === "CUMPLIMIENTO" && <><div><dt className="text-slate-500">Contrato</dt><dd className="mt-1 text-slate-900">{textField(selected, "contractNumber") || "No registrado"}</dd></div><div><dt className="text-slate-500">Contratante</dt><dd className="mt-1 text-slate-900">{textField(selected, "contractor") || "No registrado"}</dd></div><div><dt className="text-slate-500">Valor asegurado</dt><dd className="mt-1 text-slate-900">{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(selected.insuredValue || 0))}</dd></div></>}
                  </dl>
                  <p className="mt-4 text-sm text-slate-500">Esta póliza tiene su propia gestión. Para actualizar sus datos o solicitar un trámite, contacta a tu asesor.</p>
                  <a
                    href="https://api.whatsapp.com/send?phone=573135707125&text=Hola%2C%20necesito%20ayuda%20con%20mi%20p%C3%B3liza%20en%20el%20portal%20de%20ABP."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-abp-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-abp-navy"
                  >
                    Contactar asesor <FiArrowRight />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
