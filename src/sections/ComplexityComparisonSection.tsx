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

export const ComplexityComparisonSection = () => {
  return (
    <section className="bg-slate-100 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* TEXTO */}
          <FadeInWhenVisible className="space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-600">
                Complejidad operativa
              </span>
            </div>

            <h2 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
              Complejidad de la gestión:{" "}
              <span className="text-slate-700">sin vs. con ABP Seguros</span>
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Compare la carga operativa de la gestión en riesgos laborales con
              o sin intermediación especializada en ARL.
            </p>

            <p className="text-xs text-slate-500">
              Escala de referencia: 0 a 10. Valores mayores indican mayor
              complejidad.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contacto" className="btn-modern">
                Solicitar asesoría
              </a>
              <Link
                to="/servicios-empresariales"
                className="btn-modern btn-modern--dark"
              >
                Ver servicios
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* GRÁFICA */}
          <FadeInWhenVisible className="w-full">
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                Reducción de la complejidad operativa
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                Comparación por frente de gestión
              </p>
            </div>

            {/* Altura RESPONSIVE */}
            <div className="h-[300px] sm:h-[360px] lg:h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                  barCategoryGap={14}
                >
                  <CartesianGrid
                    strokeDasharray="4 6"
                    vertical={false}
                  />

                  {/* Etiquetas más angostas */}
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={130}
                    tick={{ fill: "#334155", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <XAxis
                    type="number"
                    domain={[0, 10]}
                    tick={{ fill: "#334155", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(148,163,184,0.15)" }}
                    contentStyle={{
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid rgba(148,163,184,0.45)",
                      borderRadius: 12,
                      color: "#0f172a",
                      boxShadow: "0 10px 25px rgba(2,6,23,0.08)",
                    }}
                    labelStyle={{ fontWeight: 600 }}
                  />

                  <Legend
                    wrapperStyle={{ fontSize: 11, color: "#334155" }}
                  />

                  {/* Barras más delgadas */}
                  <Bar
                    dataKey="sin"
                    name="Sin intermediario"
                    fill="#fb7185"
                    radius={[8, 8, 8, 8]}
                    barSize={10}
                  />
                  <Bar
                    dataKey="con"
                    name="Con ABP Seguros"
                    fill="#9ca3af"
                    radius={[8, 8, 8, 8]}
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leyenda compacta */}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#fb7185]" />
                Sin intermediario
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#9ca3af]" />
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
