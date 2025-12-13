import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FadeInWhenVisible } from "@/components/FadeInWhenVisible";
import { Link } from "react-router-dom";

type Row = {
  name: string;
  sin: number;
  con: number;
};

const data: Row[] = [
  { name: "Afiliación inicial al sistema", sin: 8, con: 2 },
  { name: "Reporte de accidentes de trabajo", sin: 9, con: 1 },
  { name: "Reconocimiento de prestaciones", sin: 10, con: 3 },
  { name: "Gestión de servicios asistenciales", sin: 9, con: 2 },
  { name: "Implementación del plan de prevención", sin: 7, con: 3 },
];

const formatLabel = (value: string) => {
  // Hace el label más legible en YAxis (no corta palabras en lugares raros)
  // Mantiene el texto completo (se verá mejor por ser barras horizontales).
  return value;
};

export const ComplexityComparisonSection = () => {
  return (
    <section className="bg-slate-100 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Texto (sin tarjetas) */}
          <FadeInWhenVisible className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-10 bg-slate-300" />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-600">
                Complejidad operativa
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
              Complejidad de la gestión:{" "}
              <span className="text-slate-700">sin vs. con ABP Seguros</span>
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Lo invitamos a realizar un análisis sobre la complejidad operativa
              con o sin servicios de intermediación en ARL. Un acompañamiento
              especializado reduce fricción administrativa, acelera trámites y
              mejora el control del cumplimiento.
            </p>

            <div className="space-y-2 text-sm text-slate-600 sm:text-base">
              <p className="leading-relaxed">
                La comparación se presenta en una escala de 1 a 10.
              </p>
              <p className="leading-relaxed">
                Valores más altos representan mayor carga operativa.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#contacto" className="btn-modern">
                Solicitar asesoría
              </a>
              <Link to="/servicios-empresariales" className="btn-modern btn-modern--dark">
                Ver servicios
              </Link>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
              Nota: Los valores son una referencia visual. Se pueden ajustar a métricas reales
              según el tipo de empresa y el alcance del programa.
            </p>
          </FadeInWhenVisible>

          {/* Gráfica (sin tarjeta, sin caja) */}
          <FadeInWhenVisible className="w-full">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                Reducción de la complejidad operativa
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Comparación por frente de gestión
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Complejidad (1–10) sin intermediario vs. con ABP Seguros
              </p>
            </div>

            <div className="h-[420px] sm:h-[460px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 6, right: 10, left: 8, bottom: 8 }}
                  barCategoryGap={18}
                >
                  {/* Grid más sutil */}
                  <CartesianGrid strokeDasharray="4 6" vertical={false} />

                  {/* Categorías (izquierda) */}
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={180}
                    tick={{ fill: "#334155", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatLabel}
                  />

                  {/* Escala 0-10 (abajo) */}
                  <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fill: "#334155", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.15)" }}
                    contentStyle={{
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(148,163,184,0.45)",
                      borderRadius: 14,
                      color: "#0f172a",
                      boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
                    }}
                    labelStyle={{ color: "#0f172a", fontWeight: 600 }}
                  />

                  <Legend
                    wrapperStyle={{ color: "#334155", fontSize: 12 }}
                    formatter={(value) => <span style={{ color: "#334155" }}>{value}</span>}
                  />

                  {/* Barras: sin azul; diferenciación sobria */}
                  <Bar
                    dataKey="sin"
                    name="Sin intermediario"
                    fill="#fb7185"
                    radius={[10, 10, 10, 10]}
                    barSize={14}
                  />
                  <Bar
                    dataKey="con"
                    name="Con ABP Seguros"
                    fill="#a3a3a3"
                    radius={[10, 10, 10, 10]}
                    barSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Mini leyenda textual (sin tarjeta) */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
                Sin intermediario
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#a3a3a3]" />
                Con ABP Seguros
              </span>
              <span className="text-slate-500">Escala 0–10</span>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};
