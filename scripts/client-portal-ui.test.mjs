import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { createRequire } from "node:module";
import { calculateAge } from "../src/lib/clientPortal.ts";

// Render the real component without connecting to Firebase or writing client data.
const compiled = await build({
  stdin: {
    contents: `import React from 'react';
      import {renderToStaticMarkup} from 'react-dom/server';
      import Table from './src/components/InsuredPeopleTable';
      export const render = (props) => renderToStaticMarkup(React.createElement(Table, props));`,
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  plugins: [{
    name: "offline-firebase",
    setup(builder) {
      builder.onResolve({ filter: /^@\/lib\/firebase$/ }, () => ({ path: "firebase", namespace: "offline" }));
      builder.onLoad({ filter: /.*/, namespace: "offline" }, () => ({ contents: "export const db = {};" }));
    },
  }],
});
const compiledModule = { exports: {} };
new Function("require", "module", "exports", compiled.outputFiles[0].text)(
  createRequire(import.meta.url), compiledModule, compiledModule.exports,
);
const { render } = compiledModule.exports;
const people = [
  { id: "active", nombre: "ANA ACTIVA", cedula: "111", fechaNacimiento: "1990-01-01", edad: 99, valorMensual: 4450, estado: "ACTIVO" },
  { id: "retired", nombre: "BEATRIZ RETIRADA", cedula: "222", fechaNacimiento: "1980-01-01", valorMensual: 4450, estado: "DESVINCULADO", fechaDesvinculacion: "2026-08-01" },
];
const props = { people, policyId: "test", clientUid: "test", clientEmail: null, clientName: "Prueba", onChange() {} };

test("active table has current age, compact columns and no missing-date placeholder", () => {
  const html = render({ ...props, view: "people" });
  assert.match(html, /<table/);
  assert.match(html, /Valor mensual/);
  assert.match(html, /ANA ACTIVA/);
  assert.doesNotMatch(html, /BEATRIZ RETIRADA|Sin fecha|Vinculación:|99 años/);
  assert.ok(html.includes(`${calculateAge("1990-01-01")} años`));
  assert.match(html, /Editar a ANA ACTIVA/);
  assert.match(html, /Retirar a ANA ACTIVA/);
  assert.doesNotMatch(html, /Filtrar por estado|Todos los estados/);
});

test("withdrawn table contains only retired people with read and restore actions", () => {
  const html = render({ ...props, view: "withdrawn" });
  assert.match(html, /BEATRIZ RETIRADA/);
  assert.doesNotMatch(html, /ANA ACTIVA|Vincular asegurado|Editar a /);
  assert.match(html, /Retiro: 2026-08-01/);
  assert.match(html, /Ver datos de BEATRIZ RETIRADA/);
  assert.match(html, /Deshacer retiro de BEATRIZ RETIRADA/);
});

test("empty lists are separate and do not offer a cross-status filter", () => {
  assert.match(render({ ...props, people: [people[1]], view: "people" }), /No hay asegurados activos/);
  assert.match(render({ ...props, people: [people[0]], view: "withdrawn" }), /No hay asegurados retirados/);
});

test("confirmation has concise instructions and cannot submit before review", () => {
  const html = render({ ...props, view: "confirmation" });
  assert.match(html, /<dl/);
  assert.match(html, /Asegurados activos/);
  assert.match(html, /incluso si no hubo cambios/);
  assert.match(html, /Retirados/);
  assert.match(html, /<input[^>]+type="checkbox"[^>]+disabled/);
  assert.match(html, /<button[^>]+disabled[^>]*>[\s\S]*?Enviar confirmación/);
  assert.doesNotMatch(html, /rounded-2xl border/);
});

test("the portal announces the enabled monthly reporting window", () => {
  const html = render({ ...props, view: "people" });
  assert.match(html, /Plataforma habilitada para reportar novedades/);
  assert.match(html, /Periodo:/);
  assert.match(html, /Disponible hasta/);
});
