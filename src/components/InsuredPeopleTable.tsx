import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FiEdit2, FiTrash2, FiSave, FiX, FiPlus, FiBell, FiUserPlus, FiCheckCircle } from "react-icons/fi";

export interface InsuredPerson {
  id: string;
  reg?: string | number;
  nombre: string;
  cedula: string;
  sexo?: string;
  fechaNacimiento?: string;
  edad?: string | number;
  extraprima?: number;
  valorMensual?: number;
  observaciones?: string;
  estado?: "ACTIVO" | "DESVINCULADO";
  fechaVinculacion?: string;
  fechaDesvinculacion?: string | null;
}

interface Props {
  policyId: string;
  people: InsuredPerson[];
  clientUid: string;
  clientEmail: string | null;
  clientName: string | null;
  onChange: () => void;
}

function stripUndefined(obj?: Record<string, any>) {
  if (!obj) return undefined;
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) clean[k] = v;
  }
  return Object.keys(clean).length > 0 ? clean : undefined;
}

interface MonthlyConfirmation {
  id: string;
  month: string;
  monthKey: string;
  totalMonthly: number;
  activeInsuredCount: number;
  dataSignature?: string;
  confirmedAtMs?: number;
  createdAt?: Date | { toDate?: () => Date };
}

function createDataSignature(people: InsuredPerson[]): string {
  const serialized = JSON.stringify(
    [...people]
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(({ id, reg, nombre, cedula, sexo, fechaNacimiento, edad, extraprima, valorMensual, observaciones, estado, fechaVinculacion, fechaDesvinculacion }) => ({
        id, reg, nombre, cedula, sexo, fechaNacimiento, edad, extraprima,
        valorMensual, observaciones, estado, fechaVinculacion, fechaDesvinculacion,
      }))
  );
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

function calculateAge(birthDate?: string): number | "" {
  if (!birthDate) return "";
  const [year, month, day] = birthDate.split("-").map(Number);
  if (!year || !month || !day) return "";
  const today = new Date();
  let age = today.getFullYear() - year;
  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }
  return age >= 0 ? age : "";
}

function formatConfirmationDate(value?: MonthlyConfirmation["createdAt"]): string {
  const date = value instanceof Date ? value : value?.toDate?.();
  return date
    ? new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" }).format(date)
    : "Fecha pendiente";
}

function createChangeNotification(
  action: "update" | "delete" | "create",
  clientUid: string,
  clientEmail: string | null,
  clientName: string | null,
  policyId: string,
  personId: string,
  before?: Partial<InsuredPerson>,
  after?: Partial<InsuredPerson>
) {
  const notifRef = doc(collection(db, "clientChangeNotifications"));
  const payload: Record<string, any> = {
    clientUid,
    clientEmail: clientEmail ?? null,
    clientName: clientName ?? null,
    action,
    personId,
    policyId,
    createdAt: serverTimestamp(),
    status: "PENDING",
  };
  const cleanBefore = stripUndefined(before);
  const cleanAfter = stripUndefined(after);
  if (cleanBefore) payload.before = cleanBefore;
  if (cleanAfter) payload.after = cleanAfter;
  return setDoc(notifRef, payload);
}

export default function InsuredPeopleTable({
  policyId,
  people,
  clientUid,
  clientEmail,
  clientName,
  onChange,
}: Props) {
  const [localPeople, setLocalPeople] = useState<InsuredPerson[]>(people);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<InsuredPerson>>({});
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");
  const [confirmingMonth, setConfirmingMonth] = useState(false);
  const [monthlyConfirmations, setMonthlyConfirmations] = useState<MonthlyConfirmation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adding, setAdding] = useState(false);
  const [personToUnlink, setPersonToUnlink] = useState<InsuredPerson | null>(null);
  const [unlinkDate, setUnlinkDate] = useState(new Date().toISOString().slice(0, 10));
  const [newPerson, setNewPerson] = useState<Partial<InsuredPerson>>({
    nombre: "",
    cedula: "",
    sexo: "",
    fechaNacimiento: "",
    edad: "",
    valorMensual: undefined,
    observaciones: "COBRO",
    fechaVinculacion: new Date().toISOString().slice(0, 10),
  });
  const topScrollRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  const syncHorizontalScroll = (
    source: HTMLDivElement,
    target: HTMLDivElement | null
  ) => {
    if (target && target.scrollLeft !== source.scrollLeft) {
      target.scrollLeft = source.scrollLeft;
    }
  };

  useEffect(() => {
    setLocalPeople(people);
  }, [people]);

  const activePeople = useMemo(
    () => localPeople.filter((person) => person.estado !== "DESVINCULADO"),
    [localPeople]
  );
  const unlinkedPeople = useMemo(
    () => localPeople.filter((person) => person.estado === "DESVINCULADO"),
    [localPeople]
  );
  const linkedPeople = useMemo(
    () => activePeople.filter((person) => Boolean(person.fechaVinculacion)),
    [activePeople]
  );
  const totalMonthly = useMemo(
    () => activePeople.reduce((total, person) => {
      const value = Number(person.valorMensual ?? 0);
      return total + (Number.isFinite(value) ? value : 0);
    }, 0),
    [activePeople]
  );
  const currentMonthName = new Intl.DateTimeFormat("es-CO", { month: "long" }).format(new Date());
  const currentDate = new Date();
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
  const currentDataSignature = useMemo(() => createDataSignature(activePeople), [activePeople]);
  const currentMonthConfirmations = monthlyConfirmations.filter((confirmation) => confirmation.monthKey === currentMonthKey);
  const latestCurrentMonthConfirmation = currentMonthConfirmations[0];
  const confirmedMonth = latestCurrentMonthConfirmation?.dataSignature === currentDataSignature;
  const needsReconfirmation = currentMonthConfirmations.length > 0 && !confirmedMonth;

  useEffect(() => {
    let mounted = true;
    const loadMonthlyConfirmations = async () => {
      try {
        const confirmationsQuery = query(
          collection(db, "clientChangeNotifications"),
          where("clientUid", "==", clientUid)
        );
        const snapshot = await getDocs(confirmationsQuery);
        if (!mounted) return;
        const confirmations = snapshot.docs
          .map((item) => ({ id: item.id, ...item.data() } as MonthlyConfirmation & { action?: string; policyId?: string }))
          .filter((item) => item.action === "confirm_month" && item.policyId === policyId)
          .sort((a, b) => {
            const monthComparison = b.monthKey.localeCompare(a.monthKey);
            return monthComparison !== 0 ? monthComparison : (b.confirmedAtMs ?? 0) - (a.confirmedAtMs ?? 0);
          });
        setMonthlyConfirmations(confirmations);
      } catch (error) {
        console.error("Error cargando confirmaciones mensuales:", error);
      }
    };
    loadMonthlyConfirmations();
    return () => {
      mounted = false;
    };
  }, [clientUid, policyId]);

  const filteredPeople = useMemo(() => {
    if (!searchTerm.trim()) return activePeople;
    const q = searchTerm.trim().toLowerCase();
    return activePeople.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(q) ||
        p.cedula?.toLowerCase().includes(q)
    );
  }, [activePeople, searchTerm]);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const startEdit = (person: InsuredPerson) => {
    setEditingId(person.id);
    setEditForm({ ...person });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (person: InsuredPerson) => {
    setSaving(true);
    try {
      const ref = doc(db, "clientPolicies", policyId, "insuredPeople", person.id);
      const before = { ...person };
      const editableFields = {
        reg: editForm.reg ?? "",
        nombre: editForm.nombre ?? "",
        cedula: editForm.cedula ?? "",
        sexo: editForm.sexo ?? "",
        fechaNacimiento: editForm.fechaNacimiento ?? "",
        edad: editForm.edad ?? "",
        extraprima: editForm.extraprima ?? 0,
        valorMensual: editForm.valorMensual ?? 0,
        observaciones: editForm.observaciones ?? "",
      };
      await updateDoc(ref, {
        ...editableFields,
        updatedAt: serverTimestamp(),
      });
      await createChangeNotification(
        "update",
        clientUid,
        clientEmail,
        clientName,
        policyId,
        person.id,
        before,
        editableFields
      );
      showNotif("Cambio guardado y notificado a tu asesor.");
      cancelEdit();
      onChange();
    } catch (e) {
      console.error(e);
      showNotif("Error guardando cambios.");
    } finally {
      setSaving(false);
    }
  };

  const confirmCurrentMonth = async () => {
    setConfirmingMonth(true);
    try {
      const confirmationRef = doc(collection(db, "clientChangeNotifications"));
      const confirmedAtMs = Date.now();
      await setDoc(confirmationRef, {
        clientUid,
        clientEmail: clientEmail ?? null,
        clientName: clientName ?? null,
        policyId,
        action: "confirm_month",
        month: currentMonthName,
        monthKey: currentMonthKey,
        totalMonthly,
        activeInsuredCount: activePeople.length,
        dataSignature: currentDataSignature,
        confirmedAtMs,
        createdAt: serverTimestamp(),
        status: "PENDING",
      });
      setMonthlyConfirmations((current) => [
        {
          id: confirmationRef.id,
          month: currentMonthName,
          monthKey: currentMonthKey,
          totalMonthly,
          activeInsuredCount: activePeople.length,
          dataSignature: currentDataSignature,
          confirmedAtMs,
          createdAt: new Date(),
        },
        ...current,
      ]);
      showNotif(`Confirmación de ${currentMonthName} enviada a tu asesor.`);
    } catch (error) {
      console.error(error);
      showNotif(`No fue posible confirmar el mes de ${currentMonthName}.`);
    } finally {
      setConfirmingMonth(false);
    }
  };

  const addPerson = async () => {
    if (!newPerson.nombre?.trim() || !newPerson.cedula?.trim() || !newPerson.fechaNacimiento || !newPerson.fechaVinculacion || newPerson.valorMensual === undefined) {
      showNotif("Completa nombre, cédula, nacimiento, valor mensual y vinculación.");
      return;
    }
    if (calculateAge(newPerson.fechaNacimiento) === "" || Number(newPerson.valorMensual) < 0) {
      showNotif("Revisa la fecha de nacimiento y el valor mensual.");
      return;
    }

    setSaving(true);
    try {
      const ref = doc(collection(db, "clientPolicies", policyId, "insuredPeople"));
      const person: Omit<InsuredPerson, "id"> = {
        nombre: newPerson.nombre.trim(),
        cedula: newPerson.cedula.trim(),
        sexo: newPerson.sexo || "",
        fechaNacimiento: newPerson.fechaNacimiento,
        edad: calculateAge(newPerson.fechaNacimiento),
        valorMensual: Number(newPerson.valorMensual),
        observaciones: newPerson.observaciones?.trim() || "COBRO",
        fechaVinculacion: newPerson.fechaVinculacion,
        fechaDesvinculacion: null,
        estado: "ACTIVO",
      };
      await setDoc(ref, { ...person, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      await createChangeNotification(
        "create",
        clientUid,
        clientEmail,
        clientName,
        policyId,
        ref.id,
        undefined,
        person
      );
      setAdding(false);
      setNewPerson({
        nombre: "",
        cedula: "",
        sexo: "",
        fechaNacimiento: "",
        edad: "",
        valorMensual: undefined,
        observaciones: "COBRO",
        fechaVinculacion: new Date().toISOString().slice(0, 10),
      });
      showNotif("Asegurado vinculado y cambio notificado a tu asesor.");
      onChange();
    } catch (e) {
      console.error(e);
      showNotif("Error vinculando al asegurado.");
    } finally {
      setSaving(false);
    }
  };

  const deletePerson = async (person: InsuredPerson) => {
    if (!unlinkDate) {
      showNotif("Selecciona la fecha de desvinculación.");
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (unlinkDate > today || (person.fechaVinculacion && unlinkDate < person.fechaVinculacion)) {
      showNotif("La fecha de desvinculación no es válida.");
      return;
    }
    setSaving(true);
    try {
      const ref = doc(db, "clientPolicies", policyId, "insuredPeople", person.id);
      const fechaDesvinculacion = unlinkDate;
      const after: Partial<InsuredPerson> = {
        ...person,
        estado: "DESVINCULADO",
        fechaDesvinculacion,
      };
      await updateDoc(ref, {
        estado: "DESVINCULADO",
        fechaDesvinculacion,
        updatedAt: serverTimestamp(),
      });
      await createChangeNotification(
        "delete",
        clientUid,
        clientEmail,
        clientName,
        policyId,
        person.id,
        person,
        after
      );
      showNotif("Asegurado desvinculado y cambio notificado a tu asesor.");
      setPersonToUnlink(null);
      onChange();
    } catch (e) {
      console.error(e);
      showNotif("Error desvinculando al asegurado.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mb-10">
      {personToUnlink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="unlink-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 id="unlink-title" className="text-lg font-semibold text-slate-900">Desvincular asegurado</h3>
                <p className="mt-1 text-sm text-slate-500">Indica la fecha en que <span className="font-medium text-slate-700">{personToUnlink.nombre}</span> fue desvinculado.</p>
              </div>
              <button onClick={() => setPersonToUnlink(null)} disabled={saving} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" aria-label="Cerrar">
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Fecha de desvinculación
              <input
                type="date"
                required
                min={personToUnlink.fechaVinculacion || undefined}
                max={new Date().toISOString().slice(0, 10)}
                value={unlinkDate}
                onChange={(event) => setUnlinkDate(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />
            </label>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setPersonToUnlink(null)} disabled={saving} className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50">Cancelar</button>
              <button onClick={() => deletePerson(personToUnlink)} disabled={saving || !unlinkDate} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50">
                {saving ? "Desvinculando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
      {notification ? (
        <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          {notification}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider">
            Asegurados
          </h2>
          <span className="text-xs text-slate-400">{activePeople.length} activos</span>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <input
            type="text"
            placeholder="Buscar por nombre o cédula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-0 flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-abp-gold sm:w-64"
          />
          <button
            onClick={() => setAdding((value) => !value)}
            className="inline-flex items-center gap-1 rounded-lg bg-abp-gold px-3 py-1.5 text-sm text-white"
          >
            {adding ? <FiX /> : <FiPlus />}
            {adding ? "Cancelar" : "Agregar"}
          </button>
        </div>
      </div>

      {adding && (
        <div className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
          <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Nombre completo" value={newPerson.nombre ?? ""} onChange={(e) => setNewPerson((p) => ({ ...p, nombre: e.target.value }))} />
          <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Cédula" value={newPerson.cedula ?? ""} onChange={(e) => setNewPerson((p) => ({ ...p, cedula: e.target.value }))} />
          <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm" value={newPerson.sexo ?? ""} onChange={(e) => setNewPerson((p) => ({ ...p, sexo: e.target.value }))}>
            <option value="">Sexo</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
          <label className="text-xs text-slate-500">Fecha de nacimiento<input type="date" max={new Date().toISOString().slice(0, 10)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" value={newPerson.fechaNacimiento ?? ""} onChange={(e) => { const fechaNacimiento = e.target.value; setNewPerson((p) => ({ ...p, fechaNacimiento, edad: calculateAge(fechaNacimiento) })); }} /></label>
          <label className="text-xs text-slate-500">Edad calculada<input readOnly className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600" value={newPerson.edad ?? ""} placeholder="Automática" /></label>
          <label className="text-xs text-slate-500">Valor mensual<input type="number" min="0" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" value={newPerson.valorMensual ?? ""} onChange={(e) => setNewPerson((p) => ({ ...p, valorMensual: e.target.value === "" ? undefined : Number(e.target.value) }))} placeholder="0" /></label>
          <label className="text-xs text-slate-500">Observaciones<input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" value={newPerson.observaciones ?? "COBRO"} onChange={(e) => setNewPerson((p) => ({ ...p, observaciones: e.target.value }))} /></label>
          <label className="text-xs text-slate-500">Fecha de vinculación<input type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700" value={newPerson.fechaVinculacion ?? ""} onChange={(e) => setNewPerson((p) => ({ ...p, fechaVinculacion: e.target.value }))} /></label>
          <button onClick={addPerson} disabled={saving} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 sm:col-span-2 lg:col-span-4">
            {saving ? "Guardando..." : "Vincular asegurado"}
          </button>
        </div>
      )}

      {activePeople.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">
          No hay asegurados activos registrados.
        </p>
      ) : filteredPeople.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">
          No hay resultados para "{searchTerm}".
        </p>
      ) : (
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-abp-gold" />
            Desplaza la tabla horizontalmente
          </div>
          <div
            ref={topScrollRef}
            onScroll={(event) => syncHorizontalScroll(event.currentTarget, tableScrollRef.current)}
            className="insured-table-scroll-top mb-2 max-w-full overflow-x-auto rounded-lg border border-amber-200 bg-amber-50"
            aria-label="Desplazamiento horizontal superior de la tabla"
          >
            <div className="h-px min-w-[1450px]" />
          </div>
          <div
            ref={tableScrollRef}
            onScroll={(event) => syncHorizontalScroll(event.currentTarget, topScrollRef.current)}
            className="max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm [scrollbar-color:#cbd5e1_transparent]"
          >
          <table className="w-full min-w-[1450px] border-separate border-spacing-0 text-sm [&_thead_th]:whitespace-nowrap [&_thead_th]:px-4 [&_thead_th]:py-3 [&_tbody_td]:border-b [&_tbody_td]:border-slate-100 [&_tbody_td]:px-4 [&_tbody_td]:py-3">
            <thead className="sticky top-0 z-20">
              <tr className="bg-slate-800 text-left text-xs font-semibold uppercase tracking-wider text-white">
                <th className="sticky left-0 z-30 min-w-48 bg-slate-800 px-4 py-3 shadow-[8px_0_12px_-10px_rgba(15,23,42,0.8)]">Nombre</th>
                <th className="py-2 pr-4">Cédula</th>
                <th className="py-2 pr-4">Sexo</th>
                <th className="py-2 pr-4">Fecha Nac.</th>
                <th className="py-2 pr-4">Edad</th>
                <th className="py-2 pr-4">Extraprima</th>
                <th className="py-2 pr-4">Valor Mensual</th>
                <th className="py-2 pr-4">Observaciones</th>
                <th className="py-2 pr-4">Vinculación</th>
                <th className="py-2 pr-4">Desvinculación</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="sticky right-0 z-30 min-w-64 border-l border-slate-700 bg-slate-800 px-4 py-3 text-center shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.8)]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPeople.map((p) =>
                editingId === p.id ? (
                  <tr key={p.id} className="bg-amber-50/70 align-middle">
                    <td className="sticky left-0 z-10 border-r border-amber-100 bg-amber-50 px-4 py-3 shadow-[8px_0_12px_-10px_rgba(15,23,42,0.35)]">
                      <input
                        className="w-32 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.nombre ?? ""}
                        onChange={(e) => setEditForm((f) => ({ ...f, nombre: e.target.value }))}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        className="w-24 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.cedula ?? ""}
                        onChange={(e) => setEditForm((f) => ({ ...f, cedula: e.target.value }))}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <select
                        className="border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.sexo ?? ""}
                        onChange={(e) => setEditForm((f) => ({ ...f, sexo: e.target.value }))}
                      >
                        <option value="">-</option>
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="date"
                        className="border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.fechaNacimiento ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, fechaNacimiento: e.target.value }))
                        }
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        className="w-12 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.edad ?? ""}
                        onChange={(e) => setEditForm((f) => ({ ...f, edad: e.target.value }))}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        className="w-16 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.extraprima ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, extraprima: Number(e.target.value) }))
                        }
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        type="number"
                        className="w-20 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.valorMensual ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, valorMensual: Number(e.target.value) }))
                        }
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        className="w-32 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.observaciones ?? ""}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, observaciones: e.target.value }))
                        }
                      />
                    </td>
                    <td className="py-2 pr-4 text-xs text-slate-600">{p.fechaVinculacion || "—"}</td>
                    <td className="py-2 pr-4 text-xs text-slate-600">{p.fechaDesvinculacion || "—"}</td>
                    <td className="py-2 pr-4 text-xs text-slate-600">{p.estado || "ACTIVO"}</td>
                    <td className="sticky right-0 z-10 border-l border-amber-100 bg-amber-50 px-4 py-2 text-right shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.35)]">
                      <div className="mx-auto grid w-60 grid-cols-2 gap-2">
                        <button onClick={() => saveEdit(p)} disabled={saving} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50" title="Guardar">
                          <FiSave className="h-3.5 w-3.5" /> Guardar
                        </button>
                        <button onClick={cancelEdit} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 transition hover:bg-slate-100" title="Cancelar">
                          <FiX className="h-3.5 w-3.5" /> Cancelar
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id} className="group bg-white align-middle transition odd:bg-slate-50/70 hover:bg-amber-50/60">
                    <td className="sticky left-0 z-10 min-w-48 border-r border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-[8px_0_12px_-10px_rgba(15,23,42,0.35)] transition group-odd:bg-slate-50 group-hover:bg-amber-50">{p.nombre}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.cedula}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.sexo}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.fechaNacimiento}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.edad}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.extraprima}</td>
                    <td className="py-2 pr-4 text-slate-600">
                      {p.valorMensual !== undefined && p.valorMensual !== null ? `$${Number(p.valorMensual).toLocaleString("es-CO")}` : ""}
                    </td>
                    <td className="py-2 pr-4 text-slate-600">{p.observaciones}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.fechaVinculacion || "—"}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.fechaDesvinculacion || "—"}</td>
                    <td className="py-2 pr-4">
                      <span className={p.estado === "DESVINCULADO" ? "text-xs font-medium text-slate-500" : "text-xs font-medium text-emerald-600"}>
                        {p.estado || "ACTIVO"}
                      </span>
                    </td>
                    <td className="sticky right-0 z-10 border-l border-slate-200 bg-white px-4 py-2 text-right shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.35)] transition group-odd:bg-slate-50 group-hover:bg-amber-50">
                      <div className="mx-auto grid w-60 grid-cols-2 gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        disabled={p.estado === "DESVINCULADO"}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 text-xs font-medium text-amber-700 transition hover:border-amber-300 hover:bg-amber-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        title="Editar"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          setUnlinkDate(new Date().toISOString().slice(0, 10));
                          setPersonToUnlink(p);
                        }}
                        disabled={p.estado === "DESVINCULADO"}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 text-xs font-medium text-red-600 transition hover:border-red-300 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                        title="Desvincular"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                        {p.estado === "DESVINCULADO" ? "Desvinculado" : "Desvincular"}
                      </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr className="bg-slate-800 text-white">
                <td colSpan={6} className="border-t-2 border-abp-gold px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                  Total mensual asegurados activos
                </td>
                <td className="border-t-2 border-abp-gold px-4 py-4 text-sm font-bold text-amber-300">
                  ${totalMonthly.toLocaleString("es-CO")}
                </td>
                <td colSpan={4} className="border-t-2 border-abp-gold px-4 py-4 text-xs text-slate-300">
                  {activePeople.length} {activePeople.length === 1 ? "asegurado activo" : "asegurados activos"}
                </td>
                <td className="sticky right-0 z-10 border-l border-slate-700 border-t-2 border-t-abp-gold bg-slate-800 px-4 py-3 text-center shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.8)]">
                  <button
                    onClick={confirmCurrentMonth}
                    disabled={confirmingMonth || confirmedMonth}
                    className="inline-flex h-9 w-60 items-center justify-center gap-2 rounded-lg bg-abp-gold px-3 text-xs font-semibold text-slate-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-emerald-500 disabled:text-white"
                  >
                    <FiCheckCircle className="h-4 w-4" />
                    {confirmedMonth
                      ? `${currentMonthName} confirmado`
                      : confirmingMonth
                        ? "Confirmando..."
                        : needsReconfirmation
                          ? `Confirmar nuevamente ${currentMonthName}`
                          : `Confirmar mes de ${currentMonthName}`}
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        </div>
      )}

      {monthlyConfirmations.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-100 p-2 text-blue-600"><FiCheckCircle className="h-4 w-4" /></span>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-800">Notificaciones de confirmación</h3>
                <p className="mt-0.5 text-xs text-blue-600">Confirmaciones mensuales enviadas al asesor</p>
              </div>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-blue-600 shadow-sm">{monthlyConfirmations.length}</span>
          </div>
          <div className="divide-y divide-slate-100">
            {monthlyConfirmations.map((confirmation) => (
              <article key={confirmation.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-medium capitalize text-slate-800">Mes de {confirmation.month} confirmado</p>
                  <p className="mt-1 text-xs text-slate-500">{formatConfirmationDate(confirmation.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:justify-end">
                  <div><span className="block text-slate-400">Total mensual</span><span className="font-semibold text-blue-700">${Number(confirmation.totalMonthly ?? 0).toLocaleString("es-CO")}</span></div>
                  <div><span className="block text-slate-400">Asegurados activos</span><span className="font-semibold text-slate-700">{confirmation.activeInsuredCount ?? 0}</span></div>
                  <div><span className="block text-slate-400">Estado</span><span className="font-semibold text-emerald-600">CONFIRMADO</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {linkedPeople.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-100 p-2 text-emerald-600"><FiUserPlus className="h-4 w-4" /></span>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">Notificaciones de vinculación</h3>
                <p className="mt-0.5 text-xs text-emerald-600">Historial de asegurados vinculados a la póliza</p>
              </div>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-600 shadow-sm">{linkedPeople.length}</span>
          </div>
          <div className="divide-y divide-slate-100">
            {linkedPeople.map((person) => (
              <article key={person.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-medium text-slate-800">{person.nombre}</p>
                  <p className="mt-1 text-xs text-slate-500">Cédula: {person.cedula}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:justify-end">
                  <div><span className="block text-slate-400">Fecha de vinculación</span><span className="font-semibold text-emerald-600">{person.fechaVinculacion}</span></div>
                  <div><span className="block text-slate-400">Estado</span><span className="font-semibold text-emerald-600">ACTIVO</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {unlinkedPeople.length > 0 && (
        <section className="mt-8 overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-red-100 bg-red-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-red-100 p-2 text-red-600"><FiBell className="h-4 w-4" /></span>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-red-800">Notificaciones de desvinculación</h3>
                <p className="mt-0.5 text-xs text-red-600">Historial de asegurados retirados de la póliza</p>
              </div>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-red-600 shadow-sm">{unlinkedPeople.length}</span>
          </div>
          <div className="divide-y divide-slate-100">
            {unlinkedPeople.map((person) => (
              <article key={person.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-medium text-slate-800">{person.nombre}</p>
                  <p className="mt-1 text-xs text-slate-500">Cédula: {person.cedula}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:justify-end">
                  <div><span className="block text-slate-400">Vinculación</span><span className="font-medium text-slate-700">{person.fechaVinculacion || "Sin información"}</span></div>
                  <div><span className="block text-slate-400">Desvinculación</span><span className="font-semibold text-red-600">{person.fechaDesvinculacion || "Sin información"}</span></div>
                  <div><span className="block text-slate-400">Estado</span><span className="font-semibold text-red-600">DESVINCULADO</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
