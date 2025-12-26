import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { FiAnchor, FiArrowRight, FiLifeBuoy } from "react-icons/fi";
import { calculatorHints } from "./cyclistsContent";

type ProductOption = {
  value: "vida" | "bici" | "viaje" | "combo";
  label: string;
  baseRate: number;
  minCoverage: number;
  serviceFee: number;
  description: string;
};

type ProfileOption = {
  value: "recreativo" | "entrenamiento" | "competitivo";
  label: string;
  multiplier: number;
  helper: string;
};

const productOptions: ProductOption[] = [
  {
    value: "vida",
    label: "Vida y Accidentes para Ciclistas",
    baseRate: 0.00011,
    minCoverage: 5_000_000,
    serviceFee: 9_800,
    description: "Cobertura personal frente a accidentes y fallecimiento.",
  },
  {
    value: "bici",
    label: "Seguro para la Bicicleta",
    baseRate: 0.00015,
    minCoverage: 7_000_000,
    serviceFee: 12_400,
    description: "Robo total, daños y accesorios de tu bici.",
  },
  {
    value: "viaje",
    label: "Seguro de Viaje para Ciclistas",
    baseRate: 0.00009,
    minCoverage: 6_000_000,
    serviceFee: 15_200,
    description: "Asistencia médica, traslados y responsabilidad civil en viaje.",
  },
  {
    value: "combo",
    label: "Combo Vida + Bicicleta + Viaje",
    baseRate: 0.00026,
    minCoverage: 12_000_000,
    serviceFee: 21_500,
    description: "Plan integral para ciclistas que combinan varias coberturas.",
  },
];

const profileOptions: ProfileOption[] = [
  {
    value: "recreativo",
    label: "Recreativo / urbano",
    multiplier: 1,
    helper: "Rodadas en ciudad, recados y desplazamientos cotidianos.",
  },
  {
    value: "entrenamiento",
    label: "Entrenamiento frecuente",
    multiplier: 1.28,
    helper: "Sesiones semanales, rutas exigentes y viajes ocasionales.",
  },
  {
    value: "competitivo",
    label: "Competitivo / eventos",
    multiplier: 1.55,
    helper: "Carreras, viajes internacionales y temporadas de competencia.",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

/** Permite pegar "15.000.000" / "15,000,000" / "15000000" sin romperse */
const parseCopInput = (raw: string) => {
  const cleaned = raw.replace(/[^\d]/g, "");
  if (!cleaned) return NaN;
  return Number(cleaned);
};

export const CyclistsCalculatorSection = () => {
  const [form, setForm] = useState({
    productType: productOptions[0].value,
    coverageRaw: "", // <- guardamos string para permitir pegado con separadores
    profile: profileOptions[0].value,
  });

  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<
    | null
    | {
        monthly: number;
        annual: number;
        coverageUsed: number;
        coverageEntered: number;
        product: ProductOption;
        profile: ProfileOption;
        wasAdjustedToMin: boolean;
      }
  >(null);

  const selectedProduct = useMemo(
    () => productOptions.find((o) => o.value === form.productType) ?? productOptions[0],
    [form.productType],
  );

  const selectedProfile = useMemo(
    () => profileOptions.find((o) => o.value === form.profile) ?? profileOptions[0],
    [form.profile],
  );

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setResult(null);
  };

  const handleCoverageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, coverageRaw: event.target.value }));
    setError(null);
    setResult(null);
  };

  const handleCalculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const coverageEntered = parseCopInput(form.coverageRaw);

    if (!Number.isFinite(coverageEntered) || coverageEntered <= 0) {
      setError("Ingresa el valor asegurado en COP (solo números).");
      setResult(null);
      return;
    }

    const coverageUsed = Math.max(coverageEntered, selectedProduct.minCoverage);
    const wasAdjustedToMin = coverageEntered < selectedProduct.minCoverage;

    const baseAnnual = coverageUsed * selectedProduct.baseRate;
    const adjustedAnnual =
      baseAnnual * selectedProfile.multiplier + selectedProduct.serviceFee;

    const monthly = adjustedAnnual / 12;

    setResult({
      monthly,
      annual: adjustedAnnual,
      coverageUsed,
      coverageEntered,
      product: selectedProduct,
      profile: selectedProfile,
      wasAdjustedToMin,
    });
    setError(null);
  };

  return (
    <section id="calculadora" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Calcula una prima estimada
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Diseña tu escenario ideal antes de hablar con un asesor.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            El valor final depende de aseguradora, coberturas y perfil. Empieza aquí y ajustamos
            juntos la propuesta.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          {/* Panel calculadora */}
          <FadeInWhenVisible className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-abp-blue/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-blue">
                <FiLifeBuoy className="size-3.5" />
                Simulador referencial
              </div>

              <p className="text-xs text-slate-500">
                Mínimo según producto:{" "}
                <span className="font-semibold text-slate-700">
                  {formatCurrency(selectedProduct.minCoverage)}
                </span>
              </p>
            </div>

            <form className="mt-6 grid gap-6" onSubmit={handleCalculate}>
              <div className="grid gap-2">
                <label className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tipo de producto
                </label>
                <select
                  name="productType"
                  value={form.productType}
                  onChange={handleSelectChange}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-abp-blue focus:ring-2 focus:ring-abp-blue/15"
                >
                  {productOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">{selectedProduct.description}</p>
              </div>

              <div className="grid gap-2">
                <label className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Suma asegurada / Valor bici (COP)
                </label>
                <input
                  inputMode="numeric"
                  name="coverage"
                  value={form.coverageRaw}
                  onChange={handleCoverageChange}
                  placeholder="Ej. 15000000 o 15.000.000"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-abp-blue focus:ring-2 focus:ring-abp-blue/15"
                />
                <p className="text-xs text-slate-500">
                  Tip: puedes pegar el valor con puntos o comas, igual lo toma.
                </p>
              </div>

              <div className="grid gap-2">
                <label className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Perfil / uso de la bici
                </label>
                <select
                  name="profile"
                  value={form.profile}
                  onChange={handleSelectChange}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-abp-blue focus:ring-2 focus:ring-abp-blue/15"
                >
                  {profileOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500">{selectedProfile.helper}</p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-abp-blue px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-white shadow-sm transition hover:bg-abp-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-abp-blue/30"
              >
                Calcular prima estimada
                <FiArrowRight className="size-4" />
              </button>

              {error && (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                  {error}
                </p>
              )}

              {result && !error && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Resultado referencial
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {result.product.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{result.product.description}</p>
                    </div>

                    {result.wasAdjustedToMin && (
                      <span className="rounded-full bg-abp-blue/10 px-3 py-1 text-[0.7rem] font-semibold text-abp-blue">
                        Ajustado al mínimo
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2">
                    <p className="text-lg font-semibold text-abp-blue">
                      Prima mensual estimada: {formatCurrency(result.monthly)}
                    </p>
                    <p className="text-sm text-slate-600">
                      Equivalente anual: {formatCurrency(result.annual)}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-1 text-[0.8rem] text-slate-600">
                    <p>
                      Valor ingresado:{" "}
                      <span className="font-semibold text-slate-800">
                        {formatCurrency(result.coverageEntered)}
                      </span>
                    </p>
                    <p>
                      Cobertura usada:{" "}
                      <span className="font-semibold text-slate-800">
                        {formatCurrency(result.coverageUsed)}
                      </span>
                      {result.wasAdjustedToMin ? " (mínimo del producto)" : ""}
                    </p>
                    <p>
                      Perfil:{" "}
                      <span className="font-semibold text-slate-800">
                        {result.profile.label}
                      </span>
                    </p>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    Referencia informativa. La prima final puede variar según aseguradora,
                    deducibles y coberturas adicionales.
                  </p>
                </div>
              )}
            </form>
          </FadeInWhenVisible>

          {/* Tips */}
          <FadeInWhenVisible className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-abp-blue/10 text-abp-blue">
                <FiAnchor className="size-6" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tips de asesor ABP
                </p>
                <p className="text-sm text-slate-600">
                  Con estos datos construiremos un escenario realista y te mostraremos opciones de
                  aseguradoras aliadas.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {calculatorHints.map((hint) => (
                <div
                  key={hint.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-abp-blue">
                    {hint.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {hint.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-abp-blue/30 bg-abp-blue/5 px-5 py-4 text-[0.8rem] text-slate-700">
              Ingresa lo que sabes. Un asesor ABP te contactará para ajustar coberturas reales y
              revisar aseguradoras disponibles.
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
