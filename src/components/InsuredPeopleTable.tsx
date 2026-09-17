import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiPlus,
  FiRotateCcw,
  FiSearch,
  FiUserMinus,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { db } from "@/lib/firebase";
import {
  calculateAge,
  peopleForView,
  calculateWithdrawalCharge,
  createDataSignature,
  dateIsInReportingPeriod,
  formatCurrency,
  localDate,
  monthlyReportingPeriod,
  restoredWithdrawal,
  validatePerson,
  type InsuredPerson,
  type PortalView,
} from "@/lib/clientPortal";
export type { InsuredPerson } from "@/lib/clientPortal";

interface Props {
  policyId: string;
  people: InsuredPerson[];
  clientUid: string;
  clientEmail: string | null;
  clientName: string | null;
  onChange: () => void;
  view?: PortalView;
  onNavigate?: (view: PortalView) => void;
  onBusyChange?: (busy: boolean) => void;
}
interface Movement {
  id: string;
  action: string;
  changeKind?: string;
  personId?: string;
  before?: Partial<InsuredPerson>;
  after?: Partial<InsuredPerson>;
  status?: string;
  month?: string;
  monthKey?: string;
  totalMonthly?: number;
  activeInsuredCount?: number;
  dataSignature?: string;
  signatureVersion?: number;
  confirmedAtMs?: number;
  createdAt?: { toDate?: () => Date; toMillis?: () => number };
  localTime?: number;
}
const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 disabled:bg-slate-50";
const secondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-abp-blue transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-abp-blue disabled:cursor-not-allowed disabled:opacity-50";
const primary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-abp-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-abp-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-abp-blue disabled:cursor-not-allowed disabled:opacity-50";
const movementTime = (item: Movement) =>
  item.createdAt?.toMillis?.() ?? item.confirmedAtMs ?? item.localTime ?? 0;
const clean = (value: object) =>
  Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined),
  );
const initialPerson = (): Partial<InsuredPerson> => ({
  nombre: "",
  cedula: "",
  sexo: "",
  fechaNacimiento: "",
  fechaVinculacion: localDate(),
  observaciones: "COBRO",
});
function Dialog({
  title,
  children,
  busy,
  onClose,
}: {
  title: string;
  children: ReactNode;
  busy: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      aria-labelledby="person-dialog-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-slate-950/50"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <h2 id="person-dialog-title" className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          disabled={busy}
          onClick={onClose}
          aria-label="Cerrar"
          className="rounded-lg p-2 hover:bg-slate-100 disabled:opacity-50"
        >
          <FiX />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}

export default function InsuredPeopleTable({
  policyId,
  people,
  clientUid,
  clientEmail,
  clientName,
  onChange,
  view = "people",
  onNavigate,
  onBusyChange,
}: Props) {
  const [localPeople, setLocalPeople] = useState(people);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState("");
  const [historyRetry, setHistoryRetry] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [historyLimit, setHistoryLimit] = useState(20);
  const [editor, setEditor] = useState<{
    id?: string;
    sourceSignature?: string;
    readOnly?: boolean;
    form: Partial<InsuredPerson>;
  } | null>(null);
  const [operation, setOperation] = useState<{
    kind: "withdraw" | "restore" | "undoCreate";
    person: InsuredPerson;
  } | null>(null);
  const [withdrawalDate, setWithdrawalDate] = useState(localDate());
  const [saving, setSaving] = useState(false);
  const lock = useRef(false);
  const [message, setMessage] = useState<{
    text: string;
    error?: boolean;
  } | null>(null);
  const [formError, setFormError] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [today, setToday] = useState(localDate());
  const busy = saving || !!editor || !!operation;
  useEffect(() => {
    onBusyChange?.(busy);
    return () => onBusyChange?.(false);
  }, [busy, onBusyChange]);
  useEffect(() => {
    setLocalPeople(people);
  }, [people]);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(localDate()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!busy) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);
  useEffect(() => {
    let active = true;
    setHistoryLoading(true);
    setHistoryError("");
    const unsubscribe = onSnapshot(
      query(
        collection(db, "clientChangeNotifications"),
        where("clientUid", "==", clientUid),
      ),
      (snapshot) => {
        if (active) {
          setMovements(
            snapshot.docs
              .filter((item) => item.data().policyId === policyId)
              .map((item) => ({ ...item.data(), id: item.id }) as Movement)
              .sort((a, b) => movementTime(b) - movementTime(a)),
          );
          setHistoryLoading(false);
        }
      },
      () => {
        if (active) {
          setHistoryError(
            "No pudimos cargar las novedades. Reintenta antes de confirmar el mes o deshacer movimientos.",
          );
          setHistoryLoading(false);
        }
      },
    );
    return () => {
      active = false;
      unsubscribe();
    };
  }, [clientUid, policyId, historyRetry]);
  const activePeople = useMemo(
    () => localPeople.filter((p) => p.estado !== "DESVINCULADO"),
    [localPeople],
  );
  const total = activePeople.reduce(
    (sum, p) =>
      sum +
      (Number.isFinite(Number(p.valorMensual)) ? Number(p.valorMensual) : 0),
    0,
  );
  const missingAmounts = activePeople.filter(
    (person) =>
      person.valorMensual == null ||
      !Number.isFinite(Number(person.valorMensual)) ||
      Number(person.valorMensual) < 0,
  ).length;
  const reviewDate = new Date(`${today}T12:00:00`);
  const reportingPeriod = monthlyReportingPeriod(reviewDate);
  const monthKey = reportingPeriod.monthKey;
  const month = new Intl.DateTimeFormat("es-CO", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${today}T12:00:00`));
  const monthName = new Intl.DateTimeFormat("es-CO", { month: "long" });
  const periodDate = (value: string) =>
    new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));
  const reviewPeriod = `${periodDate(reportingPeriod.start)} al ${periodDate(reportingPeriod.end)}`;
  const signature = useMemo(
    () => createDataSignature(localPeople),
    [localPeople],
  );
  const latestConfirmation = movements.find(
    (item) => item.action === "confirm_month" && item.monthKey === monthKey,
  );
  const confirmed =
    latestConfirmation?.signatureVersion === 2 &&
    latestConfirmation.dataSignature === signature;
  useEffect(() => {
    setReviewed(false);
  }, [signature, monthKey]);
  useEffect(() => {
    setSearch("");
    setPage(1);
    setHistoryLimit(20);
  }, [view]);
  const showingWithdrawn = view === "withdrawn";
  const filtered = peopleForView(localPeople, showingWithdrawn ? "withdrawn" : "people", search);
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const visiblePage = Math.min(page, pages);
  const visiblePeople = filtered.slice(
    (visiblePage - 1) * 10,
    visiblePage * 10,
  );
  const close = () => {
    if (!lock.current) {
      setEditor(null);
      setOperation(null);
      setFormError("");
    }
  };

  // Person data and its notification are committed together: either both succeed or neither changes.
  const commitPerson = async (
    action: string,
    personId: string,
    before: InsuredPerson | undefined,
    after: Partial<InsuredPerson> | undefined,
    changeKind?: string,
  ) => {
    const batch = writeBatch(db);
    const personRef = doc(
      db,
      "clientPolicies",
      policyId,
      "insuredPeople",
      personId,
    );
    const notificationRef = doc(collection(db, "clientChangeNotifications"));
    if (!after) batch.delete(personRef);
    else if (!before)
      batch.set(personRef, {
        ...clean(after),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    else
      batch.update(personRef, {
        ...clean(after),
        updatedAt: serverTimestamp(),
      });
    const movement = {
      action,
      personId,
      reportingPeriodStart: reportingPeriod.start,
      reportingPeriodEnd: reportingPeriod.end,
      reportingMonthKey: reportingPeriod.monthKey,
      ...(before ? { before: clean(before) } : {}),
      ...(after ? { after: clean(after) } : {}),
      ...(changeKind ? { changeKind } : {}),
      status: "PENDING",
    };
    batch.set(notificationRef, {
      ...movement,
      policyId,
      clientUid,
      clientEmail,
      clientName,
      createdAt: serverTimestamp(),
    });
    await batch.commit();
    setLocalPeople((current) =>
      !after
        ? current.filter((p) => p.id !== personId)
        : current.some((person) => person.id === personId)
          ? current.map((p) => (p.id === personId ? { ...p, ...after } : p))
          : [...current, { ...after, id: personId } as InsuredPerson],
    );
    setMovements((current) => [
      {
        ...movement,
        id: notificationRef.id,
        localTime: Date.now(),
      } as Movement,
      ...current.filter((item) => item.id !== notificationRef.id),
    ]);
    onChange();
  };
  const savePerson = async () => {
    if (!editor || editor.readOnly || lock.current) return;
    const validation = validatePerson(editor.form, localPeople, editor.id);
    if (validation) {
      setFormError(validation);
      return;
    }
    const currentPerson = localPeople.find((person) => person.id === editor.id);
    if (
      editor.id &&
      (!currentPerson ||
        currentPerson.estado === "DESVINCULADO" ||
        createDataSignature([currentPerson]) !== editor.sourceSignature)
    ) {
      setFormError(
        "Este registro cambió mientras lo editabas. Cierra el formulario y vuelve a abrirlo para revisar la versión actual.",
      );
      return;
    }
    lock.current = true;
    setSaving(true);
    setFormError("");
    try {
      const before = localPeople.find((p) => p.id === editor.id);
      const fields = {
        nombre: editor.form.nombre!.trim(),
        cedula: editor.form.cedula!.trim(),
        sexo: editor.form.sexo || "",
        fechaNacimiento: editor.form.fechaNacimiento!,
        edad: calculateAge(editor.form.fechaNacimiento, new Date(`${today}T12:00:00`)),
        valorMensual: Number(editor.form.valorMensual),
        extraprima: Number(editor.form.extraprima || 0),
        reg: editor.form.reg ?? "",
        observaciones: editor.form.observaciones?.trim() || "",
        ...(!before ? { fechaVinculacion: editor.form.fechaVinculacion! } : {}),
      };
      const after = before
        ? fields
        : {
            ...fields,
            estado: "ACTIVO" as const,
            fechaDesvinculacion: null,
            tipoNovedad: "INGRESO" as const,
            valorNovedad: fields.valorMensual,
            diasNovedad: 30,
          };
      await commitPerson(
        before ? "update" : "create",
        before?.id ||
          doc(collection(db, "clientPolicies", policyId, "insuredPeople")).id,
        before,
        after,
      );
      setEditor(null);
      setMessage({
        text: before
          ? "Cambios guardados. La novedad quedó pendiente de revisión por tu asesor."
          : "Asegurado vinculado. La novedad quedó pendiente de revisión por tu asesor.",
      });
    } catch {
      setFormError(
        "No se pudo guardar la operación. Revisa tu conexión e intenta nuevamente.",
      );
    } finally {
      lock.current = false;
      setSaving(false);
    }
  };
  const applyOperation = async () => {
    if (!operation || lock.current) return;
    const { person, kind } = operation;
    const currentPerson = localPeople.find((item) => item.id === person.id);
    if (
      !currentPerson ||
      createDataSignature([currentPerson]) !== createDataSignature([person])
    ) {
      setFormError(
        "El asegurado cambió mientras revisabas esta operación. Cierra y vuelve a abrir el registro.",
      );
      return;
    }
    if (
      kind === "withdraw" &&
      (calculateAge(withdrawalDate) === "" ||
        !dateIsInReportingPeriod(withdrawalDate, reportingPeriod) ||
        (person.fechaVinculacion && withdrawalDate < person.fechaVinculacion))
    ) {
      setFormError(
        `Selecciona una fecha de retiro entre ${periodDate(reportingPeriod.start)} y ${periodDate(reportingPeriod.end)}.`,
      );
      return;
    }
    lock.current = true;
    setSaving(true);
    setFormError("");
    try {
      if (kind === "withdraw") {
        const charge = calculateWithdrawalCharge(
          Number(person.valorMensual || 0),
          withdrawalDate,
        );
        await commitPerson("delete", person.id, person, {
          estado: "DESVINCULADO",
          fechaDesvinculacion: withdrawalDate,
          tipoNovedad: "RETIRO",
          valorNovedad: charge.amount,
          diasNovedad: charge.days,
          tipoNovedadAnterior: person.tipoNovedad ?? null,
          valorNovedadAnterior: person.valorNovedad ?? null,
          diasNovedadAnterior: person.diasNovedad ?? null,
        });
      } else if (kind === "restore") {
        await commitPerson(
          "update",
          person.id,
          person,
          restoredWithdrawal(person),
          "undo_delete",
        );
      } else
        await commitPerson(
          "update",
          person.id,
          person,
          undefined,
          "undo_create",
        );
      setOperation(null);
      setMessage({
        text: "Operación guardada. Puedes consultar la novedad y su estado en el historial.",
      });
    } catch {
      setFormError("No se pudo guardar la operación. Intenta nuevamente.");
    } finally {
      lock.current = false;
      setSaving(false);
    }
  };
  const confirmMonth = async () => {
    if (
      lock.current ||
      busy ||
      !reviewed ||
      missingAmounts > 0 ||
      confirmed ||
      historyLoading ||
      historyError
    )
      return;
    lock.current = true;
    setSaving(true);
    try {
      const ref = doc(collection(db, "clientChangeNotifications"));
      const item = {
        action: "confirm_month",
        month,
        monthKey,
        reportingPeriodStart: reportingPeriod.start,
        reportingPeriodEnd: reportingPeriod.end,
        totalMonthly: total,
        activeInsuredCount: activePeople.length,
        dataSignature: signature,
        signatureVersion: 2,
        confirmedAtMs: Date.now(),
        status: "PENDING",
      };
      const batch = writeBatch(db);
      batch.set(ref, {
        ...item,
        clientUid,
        clientEmail,
        clientName,
        policyId,
        createdAt: serverTimestamp(),
      });
      await batch.commit();
      setMovements((current) => [
        { ...item, id: ref.id },
        ...current.filter((movement) => movement.id !== ref.id),
      ]);
      setReviewed(false);
      setMessage({
        text: `Confirmación de ${month} enviada. Pendiente de revisión por tu asesor.`,
      });
    } catch {
      setMessage({
        text: "No pudimos enviar la confirmación. Intenta nuevamente.",
        error: true,
      });
    } finally {
      lock.current = false;
      setSaving(false);
    }
  };
  const openOperation = (
    kind: "withdraw" | "restore" | "undoCreate",
    person: InsuredPerson,
  ) => {
    setFormError("");
    setWithdrawalDate(
      kind === "withdraw" ? reportingPeriod.end : localDate(),
    );
    setOperation({ kind, person });
  };
  const summaryStats = (
    <div className="mb-8 grid divide-y divide-slate-200 border-b border-slate-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
      {[
        {
          title: "Asegurados activos",
          value: activePeople.length,
          icon: FiUsers,
        },
        {
          title: "Total mensual de activos",
          value: formatCurrency(total),
          icon: FiCheckCircle,
        },
        {
          title: "Confirmación del mes",
          value: historyLoading
            ? "Consultando…"
            : historyError
              ? "Sin verificar"
              : confirmed
                ? "Enviada"
                : latestConfirmation
                  ? "Revisar cambios"
                  : "Por confirmar",
          icon: FiClock,
        },
      ].map((stat) => (
        <div
          key={stat.title}
          className="min-w-0 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            {stat.title}
            <stat.icon className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {message && (
        <div
          role={message.error ? "alert" : "status"}
          className={`mb-5 flex items-start justify-between gap-4 border-l-2 px-4 py-3 text-sm ${message.error ? "border-red-300 text-red-800" : "border-emerald-300 text-emerald-800"}`}
        >
          <span>{message.text}</span>
          <button aria-label="Cerrar aviso" onClick={() => setMessage(null)}>
            <FiX />
          </button>
        </div>
      )}
      {historyError && (
        <div
          role="alert"
          className="mb-5 border-l-2 border-amber-300 px-4 py-3 text-sm text-amber-900"
        >
          {historyError}
          <button
            disabled={busy}
            onClick={() => setHistoryRetry((value) => value + 1)}
            className={`ml-3 ${secondary}`}
          >
            Reintentar
          </button>
        </div>
      )}
      <div
        role="status"
        className="mb-5 flex items-center gap-2 border-y border-blue-200 bg-blue-50 px-3 py-2.5 text-sm text-abp-blue"
      >
        <FiCheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          <strong>Plataforma habilitada para reportar novedades.</strong>{" "}
          Periodo: {reviewPeriod}. Disponible hasta {periodDate(reportingPeriod.enabledUntil)}.
        </p>
      </div>
      {view === "overview" && summaryStats}
      {view === "overview" && (
        <div>
          <h2 className="text-lg font-semibold">Revisión de {reviewPeriod}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Revisa quiénes continúan asegurados y registra los ingresos, retiros o cambios
            de este periodo. Después, confirma la información de {month}, incluso si no hubo cambios.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
          <button className={primary} onClick={() => onNavigate?.("people")}>
            <FiUsers /> Ver asegurados
          </button>
          <button className={secondary} onClick={() => onNavigate?.("history")}>
            <FiClock /> Ver novedades
          </button>
          <button className={secondary} onClick={() => onNavigate?.("confirmation")}>
            <FiCheckCircle /> Revisar y confirmar {monthName.format(reviewDate)}
          </button>
          </div>
        </div>
      )}
      {(view === "people" || showingWithdrawn) && (
        <section aria-label={showingWithdrawn ? "Listado de retirados" : "Listado de asegurados activos"} className="border-y border-slate-200">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Buscar por nombre o cédula</span>
              <FiSearch className="absolute left-3 top-3 text-slate-400" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Buscar por nombre o cédula"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm"
              />
            </label>
            {!showingWithdrawn && (
              <button
                className={`${primary} shrink-0`}
                disabled={busy || historyLoading}
                onClick={() => {
                  setFormError("");
                  setEditor({ form: initialPerson() });
                }}
              >
                <FiPlus /> Vincular asegurado
              </button>
            )}
          </div>
          {visiblePeople.length === 0 ? (
            <div className="py-8 text-center">
              <FiUsers className="mx-auto mb-3 h-7 w-7 text-slate-300" />
              <p className="text-sm text-slate-600">
                {search
                  ? "No encontramos asegurados con esa búsqueda."
                  : showingWithdrawn ? "No hay asegurados retirados." : "No hay asegurados activos."}
              </p>
              {search && (
                <button onClick={() => { setSearch(""); setPage(1); }} className={`mt-3 ${secondary}`}>
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto" role="region" aria-label={showingWithdrawn ? "Tabla de retirados" : "Tabla de asegurados activos"} tabIndex={0}>
              <table className="w-full min-w-[680px] table-fixed text-left">
                <caption className="sr-only">
                  {showingWithdrawn ? "Asegurados retirados" : "Asegurados activos"}. La edad se calcula a la fecha de hoy.
                </caption>
                <thead className="border-y border-slate-100 bg-slate-50 text-xs text-slate-500">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-medium">Asegurado</th>
                    <th scope="col" className="w-28 px-3 py-2 text-right font-medium">Valor mensual</th>
                    <th scope="col" className="w-24 px-3 py-2 font-medium">Estado</th>
                    <th scope="col" className="w-60 px-3 py-2 text-right font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visiblePeople.map((person) => {
                    const age = calculateAge(person.fechaNacimiento, new Date(`${today}T12:00:00`));
                    const date = showingWithdrawn ? person.fechaDesvinculacion : person.fechaVinculacion;
                    const canWithdrawInPeriod =
                      !person.fechaVinculacion ||
                      person.fechaVinculacion <= reportingPeriod.end;
                    return (
                      <tr key={person.id} className="hover:bg-slate-50/60">
                        <td className="px-3 py-2.5 align-middle">
                          <p className="truncate text-sm font-semibold" title={person.nombre}>{person.nombre}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Cédula {person.cedula}{age !== "" && <span> · {age} años</span>}
                          </p>
                          {date?.trim() && (
                            <p className="mt-0.5 text-xs text-slate-500">
                              {showingWithdrawn ? "Retiro" : "Vinculación"}: {date}
                            </p>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm font-medium tabular-nums">
                          {person.valorMensual == null || !Number.isFinite(Number(person.valorMensual))
                            ? "Sin informar" : formatCurrency(Number(person.valorMensual))}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className={`rounded-full px-2 py-1 text-xs font-medium ${showingWithdrawn ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>
                            {showingWithdrawn ? "Retirado" : "Activo"}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            {!showingWithdrawn ? (
                              <>
                                <button
                                  disabled={busy}
                                  aria-label={`Editar a ${person.nombre}`}
                                  onClick={() => {
                                    setFormError("");
                                    setEditor({ id: person.id, sourceSignature: createDataSignature([person]), form: { ...person } });
                                  }}
                                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-50"
                                >
                                  <FiEdit2 /> Editar
                                </button>
                                <button
                                  disabled={busy || historyLoading || !canWithdrawInPeriod}
                                  aria-label={`Retirar a ${person.nombre}`}
                                  title={
                                    canWithdrawInPeriod
                                      ? `Registrar retiro del periodo ${reviewPeriod}`
                                      : "Este asegurado fue vinculado después del periodo habilitado"
                                  }
                                  onClick={() => openOperation("withdraw", person)}
                                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                                >
                                  <FiUserMinus /> Retirar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  disabled={busy}
                                  aria-label={`Ver datos de ${person.nombre}`}
                                  onClick={() => { setFormError(""); setEditor({ id: person.id, form: { ...person }, readOnly: true }); }}
                                  className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-50"
                                >Ver datos</button>
                                <button
                                  disabled={busy || historyLoading || !!historyError}
                                  aria-label={`Deshacer retiro de ${person.nombre}`}
                                  onClick={() => openOperation("restore", person)}
                                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-50"
                                >
                                  <FiRotateCcw /> Deshacer retiro
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 py-3 text-xs text-slate-500">
            <span>{filtered.length} {showingWithdrawn ? "retirados" : "activos"} · Página {visiblePage} de {pages}</span>
            {pages > 1 && (
              <div className="flex gap-2">
                <button disabled={visiblePage === 1} onClick={() => setPage(visiblePage - 1)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-40">Anterior</button>
                <button disabled={visiblePage === pages} onClick={() => setPage(visiblePage + 1)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-40">Siguiente</button>
              </div>
            )}
          </div>
        </section>
      )}
      {view === "history" && (
        <section aria-label="Historial de movimientos" className="border-y border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2 py-3">
            <p className="text-xs text-slate-500">Del más reciente al más antiguo</p>
          </div>
          {historyLoading ? (
            <p role="status" className="py-6 text-sm text-slate-500">Cargando novedades…</p>
          ) : movements.length === 0 ? (
            <p className="py-6 text-sm text-slate-500">
              {historyError ? "El historial no está disponible." : "Aún no hay novedades registradas para esta póliza."}
            </p>
          ) : (
            <>
              <div className="overflow-x-auto" role="region" aria-label="Tabla de novedades" tabIndex={0}>
                <table className="w-full min-w-[680px] table-fixed text-left">
                  <caption className="sr-only">Ingresos, actualizaciones, retiros y confirmaciones mensuales</caption>
                  <thead className="border-y border-slate-100 bg-slate-50 text-xs text-slate-500">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Movimiento</th>
                      <th scope="col" className="w-36 px-3 py-2 font-medium">Fecha</th>
                      <th scope="col" className="w-36 px-3 py-2 font-medium">Estado</th>
                      <th scope="col" className="w-40 px-3 py-2 text-right font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {movements.slice(0, historyLimit).map((item) => {
                      const kind = item.changeKind || item.action;
                      const titles: Record<string, string> = {
                        create: "Vinculación", update: "Actualización", delete: "Retiro",
                        undo_delete: "Retiro deshecho", undo_create: "Ingreso deshecho",
                        confirm_month: "Confirmación mensual",
                      };
                      const person = localPeople.find((p) => p.id === item.personId);
                      const latest = movements.find((m) => m.personId === item.personId);
                      const time = movementTime(item);
                      const subject = item.action === "confirm_month" ? item.month : item.after?.nombre || item.before?.nombre || person?.nombre || "Asegurado";
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60">
                          <td className="px-3 py-2.5">
                            <p className="truncate text-sm font-semibold" title={`${titles[kind] || "Movimiento"} · ${subject || ""}`}>
                              {titles[kind] || "Movimiento"} · {subject}
                            </p>
                            {item.action === "confirm_month" && (
                              <p className="mt-0.5 text-xs text-slate-500">{item.activeInsuredCount ?? 0} activos · {formatCurrency(Number(item.totalMonthly || 0))}</p>
                            )}
                            {(kind === "create" || kind === "delete") && item.after?.valorNovedad != null && (
                              <p className="mt-0.5 text-xs text-slate-500">
                                {kind === "delete" ? "Cobro por retiro" : "Cobro de ingreso"}: {formatCurrency(item.after.valorNovedad)}
                                {kind === "delete" && item.after.diasNovedad != null ? ` · ${item.after.diasNovedad} días` : ""}
                              </p>
                            )}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-slate-600">
                            {time ? new Intl.DateTimeFormat("es-CO", { dateStyle: "short", timeStyle: "short" }).format(new Date(time)) : "—"}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-slate-600">
                            {item.status === "PENDING" ? "Pendiente de revisión" : item.status || "Sin informar"}
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            {person && latest?.id === item.id && item.action === "create" && person.estado !== "DESVINCULADO" && (
                              <button disabled={busy || !!historyError} onClick={() => openOperation("undoCreate", person)}
                                aria-label={`Deshacer ingreso de ${person.nombre}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-semibold text-abp-blue hover:bg-blue-100 disabled:opacity-50">
                                <FiRotateCcw /> Deshacer ingreso
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-100 py-3">
                <p className="text-xs text-slate-500">{Math.min(historyLimit, movements.length)} de {movements.length} movimientos</p>
                {historyLimit < movements.length && (
                  <button className={secondary} onClick={() => setHistoryLimit((limit) => limit + 20)}>Ver más movimientos</button>
                )}
              </div>
            </>
          )}
        </section>
      )}
      {view === "confirmation" && (
        <section className="border-t border-slate-200 py-4">
          <h2 className="text-lg font-semibold">
            Revisión de {reviewPeriod}
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-700">
            Confirmación correspondiente a {month}.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Revisa los activos en Asegurados y las salidas en Retirados.</li>
            <li>Comprueba los cambios en Novedades y revisa el total de abajo.</li>
            <li>Marca la casilla y envía la confirmación, incluso si no hubo cambios.</li>
          </ol>
          <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-200 text-sm">
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600">Asegurados activos</dt>
              <dd className="font-semibold tabular-nums">{activePeople.length}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600">Total mensual de activos</dt>
              <dd className="font-semibold tabular-nums">{formatCurrency(total)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600">Estado de la confirmación</dt>
              <dd className="font-medium">{historyLoading ? "Consultando…" : historyError ? "Sin verificar" : confirmed ? "Enviada" : latestConfirmation ? "Revisar cambios" : "Por confirmar"}</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-slate-500">
            Este total corresponde a los activos. Los cobros de ingreso y retiro se consultan por separado en Novedades.
          </p>
          {missingAmounts > 0 && (
            <p
              role="alert"
              className="mt-5 border-l-2 border-amber-300 px-4 py-3 text-sm text-amber-900"
            >
              Hay {missingAmounts} asegurados activos sin un valor mensual
              válido. Completa sus datos antes de confirmar el total.
            </p>
          )}
          {latestConfirmation && !confirmed && (
            <p className="mt-5 border-l-2 border-amber-300 px-4 py-3 text-sm text-amber-900">
              Hay una confirmación anterior. Revisa los datos actuales y vuelve
              a confirmar para dejar constancia de esta versión.
            </p>
          )}
          {confirmed ? (
            <div
              role="status"
              className="mt-6 border-l-2 border-emerald-300 px-4 py-3 text-sm text-emerald-800"
            >
              La confirmación de los datos actuales ya fue enviada. Está
              disponible en Novedades con su estado de revisión.
            </div>
          ) : (
            <>
              <label className="mt-4 flex items-start gap-3 py-2 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={reviewed}
                  onChange={(event) => setReviewed(event.target.checked)}
                  disabled={
                    historyLoading ||
                    !!historyError ||
                    saving ||
                    missingAmounts > 0
                  }
                  className="mt-1 h-4 w-4 accent-slate-900"
                />
                <span>He revisado los cambios de {reviewPeriod} y confirmo para {month}{" "}
                los {activePeople.length} asegurados activos y su total mensual de {formatCurrency(total)}.</span>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className={secondary}
                  onClick={() => onNavigate?.("people")}
                  disabled={saving}
                >
                  Revisar asegurados
                </button>
                <button
                  className={primary}
                  onClick={confirmMonth}
                  disabled={
                    !reviewed ||
                    busy ||
                    historyLoading ||
                    !!historyError ||
                    missingAmounts > 0
                  }
                >
                  <FiCheckCircle />
                  {saving ? "Enviando…" : "Enviar confirmación"}
                </button>
              </div>
            </>
          )}
        </section>
      )}
      {editor && (
        <Dialog
          title={editor.readOnly ? "Datos del asegurado" : editor.id ? "Editar asegurado" : "Vincular asegurado"}
          busy={saving}
          onClose={close}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void savePerson();
            }}
          >
            <p className="mb-5 text-sm text-slate-500">
              Los campos con * son obligatorios. La edad se calcula
              automáticamente.
            </p>
            {formError && (
              <p
                role="alert"
                className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                {formError}
              </p>
            )}
            <fieldset disabled={saving || editor.readOnly} className="grid gap-4 sm:grid-cols-2">
              {[
                { key: "nombre", label: "Nombre completo *", required: true },
                { key: "cedula", label: "Cédula *", required: true },
                {
                  key: "fechaNacimiento",
                  label: "Fecha de nacimiento *",
                  type: "date",
                  required: true,
                },
                {
                  key: "fechaVinculacion",
                  label: `Fecha de vinculación${!editor.id || localPeople.find((person) => person.id === editor.id)?.fechaVinculacion ? " *" : ""}`,
                  type: "date",
                  required: !editor.id || !!localPeople.find((person) => person.id === editor.id)?.fechaVinculacion,
                },
                {
                  key: "valorMensual",
                  label: "Valor mensual (COP) *",
                  type: "number",
                  required: true,
                },
                { key: "extraprima", label: "Extraprima", type: "number" },
                { key: "reg", label: "Registro" },
              ].map((field) => (
                <label
                  key={field.key}
                  className="text-xs font-medium text-slate-600"
                >
                  {field.label}
                  <input
                    autoFocus={field.key === "nombre"}
                    type={field.type || "text"}
                    required={field.required}
                    readOnly={field.key === "fechaVinculacion" && !!editor.id}
                    max={field.type === "date" ? today : undefined}
                    min={field.type === "number" ? 0 : undefined}
                    step={field.type === "number" ? "any" : undefined}
                    value={String(
                      editor.form[field.key as keyof InsuredPerson] ?? "",
                    )}
                    onChange={(event) => {
                      const value =
                        field.type === "number"
                          ? event.target.value === ""
                            ? undefined
                            : Number(event.target.value)
                          : event.target.value;
                      setEditor(
                        (current) =>
                          current && {
                            ...current,
                            form: { ...current.form, [field.key]: value },
                          },
                      );
                    }}
                    className={fieldClass}
                  />
                  {field.key === "fechaVinculacion" && editor.id && (
                    <span className="mt-1 block font-normal text-slate-500">
                      La fecha original de vinculación se conserva al editar.
                    </span>
                  )}
                </label>
              ))}
              <label className="text-xs font-medium text-slate-600">
                Sexo
                <select
                  value={editor.form.sexo || ""}
                  onChange={(event) =>
                    setEditor({
                      ...editor,
                      form: { ...editor.form, sexo: event.target.value },
                    })
                  }
                  className={fieldClass}
                >
                  <option value="">Sin informar</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </label>
              <p className="self-center text-sm text-slate-500">
                Edad a hoy:{" "}
                <strong className="text-slate-800">
                  {calculateAge(editor.form.fechaNacimiento, new Date(`${today}T12:00:00`)) === ""
                    ? "Por calcular"
                    : `${calculateAge(editor.form.fechaNacimiento, new Date(`${today}T12:00:00`))} años`}
                </strong>
              </p>
              <label className="text-xs font-medium text-slate-600 sm:col-span-2">
                Observaciones
                <textarea
                  value={editor.form.observaciones || ""}
                  onChange={(event) =>
                    setEditor({
                      ...editor,
                      form: {
                        ...editor.form,
                        observaciones: event.target.value,
                      },
                    })
                  }
                  rows={3}
                  className={fieldClass}
                />
              </label>
            </fieldset>
            {!editor.id && (
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
                Cobro de ingreso por el mes completo:{" "}
                {formatCurrency(Number(editor.form.valorMensual || 0))}, según
                el valor mensual registrado. Según el corte de GRADESA, los
                ingresos no se prorratean.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={close}
                className={secondary}
              >
                {editor.readOnly ? "Cerrar" : "Cancelar"}
              </button>
              {!editor.readOnly && <button type="submit" disabled={saving} className={primary}>
                {saving ? "Guardando…" : "Guardar asegurado"}
              </button>}
            </div>
          </form>
        </Dialog>
      )}
      {operation && (
        <Dialog
          title={
            operation.kind === "withdraw"
              ? "Retirar asegurado"
              : operation.kind === "restore"
                ? "Deshacer retiro"
                : "Deshacer ingreso"
          }
          busy={saving}
          onClose={close}
        >
          <p className="font-semibold">{operation.person.nombre}</p>
          <p className="mt-1 text-sm text-slate-500">
            Cédula {operation.person.cedula}
          </p>
          {formError && (
            <p
              role="alert"
              className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              {formError}
            </p>
          )}
          {operation.kind === "withdraw" ? (
            <>
              <label className="mt-5 block text-sm font-medium">
                Fecha de retiro
                <input
                  type="date"
                  disabled={saving}
                  value={withdrawalDate}
                  min={
                    operation.person.fechaVinculacion &&
                    operation.person.fechaVinculacion > reportingPeriod.start
                      ? operation.person.fechaVinculacion
                      : reportingPeriod.start
                  }
                  max={reportingPeriod.end}
                  onChange={(event) => setWithdrawalDate(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <p className="mt-2 text-xs text-slate-500">
                Solo se permiten retiros del periodo habilitado: {reviewPeriod}.
              </p>
              <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                Cobro por retiro:{" "}
                <strong>
                  {formatCurrency(
                    calculateWithdrawalCharge(
                      Number(operation.person.valorMensual || 0),
                      withdrawalDate,
                    ).amount,
                  )}
                </strong>
                <p className="mt-2 text-xs">
                  {
                    calculateWithdrawalCharge(
                      Number(operation.person.valorMensual || 0),
                      withdrawalDate,
                    ).days
                  }{" "}
                  días hasta el primer día del siguiente mes, sobre una base de
                  30 días. Si el retiro es el día 1, el cobro es $0.
                </p>
              </div>
            </>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              {operation.kind === "restore"
                ? "El asegurado volverá a estar activo. El retiro anterior permanecerá en el historial y el cambio quedará registrado para tu asesor."
                : "Esta acción elimina el registro del asegurado creado por ese ingreso. Úsala para corregir un ingreso por error; para una salida de la póliza, utiliza Retirar. El historial conservará ambos movimientos."}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button disabled={saving} onClick={close} className={secondary}>
              Cancelar
            </button>
            <button
              disabled={
                saving || (operation.kind === "withdraw" && !withdrawalDate)
              }
              onClick={applyOperation}
              className={primary}
            >
              {saving
                ? "Guardando…"
                : operation.kind === "withdraw"
                  ? "Confirmar retiro"
                  : "Confirmar cambio"}
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
