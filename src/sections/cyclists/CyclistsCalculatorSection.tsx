import { useState } from "react";
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

export const CyclistsCalculatorSection = () => {
  const [form, setForm] = useState({
    productType: productOptions[0].value,
    coverage: "",
    profile: profileOptions[0].value,
  });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<
    | null
    | {
        monthly: number;
        annual: number;
        coverageUsed: number;
        product: ProductOption;
        profile: ProfileOption;
      }
  >(null);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setResult(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setResult(null);
  };

  const handleCalculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedProduct = productOptions.find(
      (option) => option.value === form.productType,
    );
    const selectedProfile = profileOptions.find(
      (option) => option.value === form.profile,
    );

    if (!selectedProduct || !selectedProfile) {
      setError("Selecciona un producto y perfil válidos.");
      setResult(null);
      return;
    }

    const coverageValue = Number(form.coverage);

    if (!Number.isFinite(coverageValue) || coverageValue <= 0) {
      setError(
        `Ingresa el valor asegurado en pesos (mínimo ${formatCurrency(
          selectedProduct.minCoverage,
        )}).`,
      );
      setResult(null);
      return;
    }

    const coverageUsed = Math.max(coverageValue, selectedProduct.minCoverage);
    const baseAnnual = coverageUsed * selectedProduct.baseRate;
    const adjustedAnnual = baseAnnual * selectedProfile.multiplier + selectedProduct.serviceFee;
    const monthly = adjustedAnnual / 12;

    setResult({
      monthly,
      annual: adjustedAnnual,
      coverageUsed,
      product: selectedProduct,
      profile: selectedProfile,
    });
    setError(null);
  };

  return (
    <section id="calculadora" className="bg-abp-light py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInWhenVisible className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-abp-blue/70">
            Calcula una prima estimada
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-abp-blue md:text-4xl">
            Diseña tu escenario ideal antes de hablar con un asesor.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            El valor final depende de aseguradora, coberturas y perfil. Empieza aquí y ajustamos juntos la propuesta.
          </p>
        </FadeInWhenVisible>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <FadeInWhenVisible className="relative overflow-hidden rounded-3xl border border-abp-blue/20 bg-gradient-to-br from-abp-blue via-abp-navy to-abp-midnight p-8 text-white shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(93,181,255,0.25),transparent_55%)]" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-abp-gold/40 bg-white/10 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-abp-gold/90">
                <FiLifeBuoy className="size-3.5" />
                Simulador referencial
              </div>

              <form className="grid gap-6 text-sm text-white/90" onSubmit={handleCalculate}>
                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Tipo de producto
                  </span>
                  <select
                    name="productType"
                    value={form.productType}
                    onChange={handleSelectChange}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-abp-gold focus:outline-none"
                  >
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Suma asegurada / Valor bici (COP)
                  </span>
                  <input
                    type="number"
                    min="0"
                    name="coverage"
                    value={form.coverage}
                    onChange={handleInputChange}
                    placeholder="Ej. 15000000"
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-abp-gold focus:outline-none"
                  />
                </label>

                <label className="grid gap-2 text-left">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                    Perfil / uso de la bici
                  </span>
                  <select
                    name="profile"
                    value={form.profile}
                    onChange={handleSelectChange}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-abp-gold focus:outline-none"
                  >
                    {profileOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-abp-gold px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-abp-navy shadow-lg transition hover:bg-abp-gold/90"
                >
                  Calcular prima estimada
                  <FiArrowRight className="size-4" />
                </button>

                {error && (
                  <p className="rounded-2xl border border-abp-gold/40 bg-abp-gold/10 px-4 py-3 text-xs text-abp-gold">
                    {error}
                  </p>
                )}

                {result && !error && (
                  <div className="grid gap-4 rounded-3xl border border-white/20 bg-white/10 px-5 py-5 text-left">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-abp-gold/80">
                        Resultado referencial
                      </p>
                      <p className="mt-1 text-xs text-white/70">{result.product.description}</p>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <p className="text-base font-semibold text-white">
                        Prima mensual estimada: {formatCurrency(result.monthly)}
                      </p>
                      <p className="text-sm text-white/80">
                        Equivalente anual: {formatCurrency(result.annual)}
                      </p>
                    </div>

                    <div className="grid gap-1 text-[0.7rem] text-white/70">
                      <p>
                        Cobertura usada en el cálculo: {formatCurrency(result.coverageUsed)}
                        {Number(form.coverage) < result.coverageUsed
                          ? " (ajustada al mínimo sugerido)"
                          : ""}
                      </p>
                      <p>Perfil seleccionado: {result.profile.label}</p>
                      <p>{result.profile.helper}</p>
                    </div>

                    <p className="text-[0.65rem] text-white/60">
                      Referencia informativa. La prima final puede variar según aseguradora, deducibles y coberturas adicionales.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible className="rounded-3xl border border-abp-blue/20 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-abp-blue/10 text-abp-blue">
                <FiAnchor className="size-6" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-abp-blue/80">
                  Tips de asesor ABP
                </p>
                <p className="text-sm text-slate-600">
                  Con estos datos construiremos un escenario realista y te mostraremos opciones de aseguradoras aliadas.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              {calculatorHints.map((hint) => (
                <div
                  key={hint.title}
                  className="rounded-2xl border border-abp-blue/20 bg-abp-light px-5 py-4"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-abp-blue">
                    {hint.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{hint.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-abp-gold/50 bg-abp-cream px-5 py-4 text-[0.75rem] text-abp-blue">
              Ingresa lo que sabes. Un asesor ABP te contactará para ajustar coberturas reales y revisar aseguradoras disponibles.
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
