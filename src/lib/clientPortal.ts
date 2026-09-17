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
  tipoNovedad?: "INGRESO" | "RETIRO" | null;
  valorNovedad?: number | null;
  diasNovedad?: number | null;
  tipoNovedadAnterior?: "INGRESO" | "RETIRO" | null;
  valorNovedadAnterior?: number | null;
  diasNovedadAnterior?: number | null;
}

export type PortalView = "overview" | "people" | "withdrawn" | "history" | "confirmation";

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function calculateAge(value?: string, today = new Date()): number | "" {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    value > localDate(today)
  )
    return "";
  return (
    today.getFullYear() -
    year -
    (today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
      ? 1
      : 0)
  );
}

export function peopleForView(
  people: InsuredPerson[],
  view: "people" | "withdrawn",
  search = "",
): InsuredPerson[] {
  const term = search.trim().toLocaleLowerCase("es");
  return people
    .filter((person) =>
      (view === "withdrawn"
        ? person.estado === "DESVINCULADO"
        : person.estado !== "DESVINCULADO") &&
      `${person.nombre} ${person.cedula}`.toLocaleLowerCase("es").includes(term),
    )
    .sort((a, b) => (a.nombre || "").localeCompare(b.nombre || "", "es"));
}

export function validatePerson(
  person: Partial<InsuredPerson>,
  people: InsuredPerson[],
  editingId?: string,
): string {
  const requiresStartDate = !editingId || !!people.find((p) => p.id === editingId)?.fechaVinculacion;
  if (
    !person.nombre?.trim() ||
    !person.cedula?.trim() ||
    !person.fechaNacimiento ||
    (requiresStartDate && !person.fechaVinculacion) ||
    person.valorMensual === undefined
  )
    return "Completa nombre, cédula, nacimiento, vinculación y valor mensual.";
  if (calculateAge(person.fechaNacimiento) === "")
    return "Revisa la fecha de nacimiento.";
  if (
    !Number.isFinite(Number(person.valorMensual)) ||
    Number(person.valorMensual) < 0 ||
    (person.extraprima !== undefined &&
      (!Number.isFinite(person.extraprima) || person.extraprima < 0))
  )
    return "Los valores deben ser números iguales o mayores que cero.";
  if (
    person.fechaVinculacion &&
    (calculateAge(person.fechaVinculacion) === "" ||
    person.fechaVinculacion < person.fechaNacimiento)
  )
    return "La vinculación debe estar entre el nacimiento y hoy.";
  const document = person.cedula.replace(/\s/g, "").toLowerCase();
  if (
    people.some(
      (p) =>
        p.id !== editingId &&
        p.cedula?.replace(/\s/g, "").toLowerCase() === document,
    )
  )
    return "Esta cédula ya está registrada en la póliza. Busca al asegurado para editarlo o deshacer su retiro.";
  return "";
}

// Preserve the existing billing convention; this is not a new rate calculation.
export function calculateWithdrawalCharge(
  monthlyValue: number,
  withdrawalDate: string,
) {
  const [year, month, day] = withdrawalDate.split("-").map(Number);
  if (!year || !month || !day || !Number.isFinite(monthlyValue))
    return { days: 0, amount: 0 };
  // GRADESA's cutoff convention: a retirement on the first day is outside
  // the new billing period, so it has no charge. Other retirement dates are
  // prorated through the first day of the following month on a 30-day basis.
  if (day === 1) return { days: 0, amount: 0 };
  const days = Math.max(
    0,
    Math.round(
      (Date.UTC(year, month, 1) - Date.UTC(year, month - 1, day)) / 86_400_000,
    ),
  );
  return { days, amount: (monthlyValue / 30) * days };
}

export interface MonthlyReportingPeriod {
  start: string;
  end: string;
  enabledFrom: string;
  enabledUntil: string;
  monthKey: string;
}

export function monthlyReportingPeriod(date = new Date()): MonthlyReportingPeriod {
  const year = date.getFullYear();
  const month = date.getMonth();
  return {
    start: localDate(new Date(year, month - 1, 1, 12)),
    end: localDate(new Date(year, month, 1, 12)),
    enabledFrom: localDate(new Date(year, month, 1, 12)),
    enabledUntil: localDate(new Date(year, month + 1, 0, 12)),
    monthKey: `${year}-${String(month + 1).padStart(2, "0")}`,
  };
}

export function dateIsInReportingPeriod(
  value: string,
  period: MonthlyReportingPeriod,
): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    value >= period.start &&
    value <= period.end;
}

export function createDataSignature(people: InsuredPerson[]): string {
  const serialized = JSON.stringify(
    [...people]
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(
        ({
          id,
          reg,
          nombre,
          cedula,
          sexo,
          fechaNacimiento,
          edad,
          extraprima,
          valorMensual,
          observaciones,
          estado,
          fechaVinculacion,
          fechaDesvinculacion,
          tipoNovedad,
          valorNovedad,
          diasNovedad,
        }) => ({
          id,
          reg,
          nombre,
          cedula,
          sexo,
          fechaNacimiento,
          edad,
          extraprima,
          valorMensual,
          observaciones,
          estado,
          fechaVinculacion,
          fechaDesvinculacion,
          tipoNovedad,
          valorNovedad,
          diasNovedad,
        }),
      ),
  );
  let hash = 2166136261;
  for (let i = 0; i < serialized.length; i++) {
    hash ^= serialized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export function restoredWithdrawal(
  person: InsuredPerson,
): Partial<InsuredPerson> {
  return {
    estado: "ACTIVO",
    fechaDesvinculacion: null,
    tipoNovedad: person.tipoNovedadAnterior ?? null,
    valorNovedad: person.valorNovedadAnterior ?? null,
    diasNovedad: person.diasNovedadAnterior ?? null,
  };
}

export function policyType(data: Record<string, unknown>): string {
  for (const key of [
    "policyType",
    "assignedPolicyType",
    "tipoPoliza",
    "tipoDePoliza",
    "ramo",
    "branch",
  ]) {
    if (typeof data[key] === "string" && data[key])
      return (data[key] as string).trim().toUpperCase().replace(/\s+/g, "_");
  }
  return "";
}

export function policyLabel(type: string): string {
  return (
    (
      {
        VIDA_GRUPO: "Vida grupo",
        VIDA_INDIVIDUAL: "Vida individual",
        SALUD: "Salud",
        GENERALES: "Seguros generales",
        ARL: "Riesgos laborales",
        AUTOS: "Autos",
        CUMPLIMIENTO: "Cumplimiento",
        RESPONSABILIDAD_CIVIL: "Responsabilidad civil",
        HOGAR: "Hogar",
        PENSIONES: "Pensiones",
        OTRA: "Otra póliza",
      } as Record<string, string>
    )[type] || "Póliza"
  );
}
