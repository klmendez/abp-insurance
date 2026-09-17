import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAge,
  calculateWithdrawalCharge,
  createDataSignature,
  localDate,
  monthlyReportingPeriod,
  dateIsInReportingPeriod,
  peopleForView,
  restoredWithdrawal,
  validatePerson,
} from "../src/lib/clientPortal.ts";

const person = {
  id: "person-1",
  nombre: "Persona de prueba",
  cedula: "123456",
  fechaNacimiento: "1990-02-10",
  fechaVinculacion: "2020-01-01",
  valorMensual: 30000,
  estado: "ACTIVO",
  tipoNovedad: "INGRESO",
  valorNovedad: 30000,
  diasNovedad: 30,
};

test("age is calculated at today's date instead of the stored spreadsheet age", () => {
  const today = new Date(2026, 8, 16, 12);
  assert.equal(calculateAge("1990-09-16", today), 36);
  assert.equal(calculateAge("1990-09-17", today), 35);
  assert.equal(calculateAge("1990-09-15", today), 36);
  assert.equal(calculateAge("2026-09-16", today), 0);
  assert.equal(calculateAge("2026-09-17", today), "");
  assert.equal(calculateAge(undefined, today), "");
  assert.equal(calculateAge("2026-02-30", today), "");
  assert.equal(calculateAge("2000-02-29", new Date(2026, 1, 28)), 25);
  assert.equal(calculateAge("2000-02-29", new Date(2026, 2, 1)), 26);
});

test("active and withdrawn lists remain separate during searches and status changes", () => {
  const active = { ...person, nombre: "Ana Activa" };
  const retired = { ...person, id: "retired", nombre: "Beatriz Retirada", cedula: "654", estado: "DESVINCULADO" };
  const legacy = { ...person, id: "legacy", nombre: "Carlos Activo", cedula: "789", estado: undefined };
  const people = [retired, legacy, active];
  assert.deepEqual(peopleForView(people, "people").map(p => p.id), [active.id, legacy.id]);
  assert.deepEqual(peopleForView(people, "withdrawn").map(p => p.id), [retired.id]);
  assert.deepEqual(peopleForView(people, "people", "654"), []);
  assert.deepEqual(peopleForView(people, "withdrawn", " ANA "), []);
  assert.deepEqual(peopleForView(people, "withdrawn", " BEATRIZ "), [retired]);
  assert.deepEqual(peopleForView(people, "people", "789"), [legacy]);
  const withdrawn = { ...active, estado: "DESVINCULADO" };
  assert.deepEqual(peopleForView([withdrawn], "people"), []);
  assert.deepEqual(peopleForView([withdrawn], "withdrawn"), [withdrawn]);
  const restored = { ...withdrawn, ...restoredWithdrawal(withdrawn) };
  assert.deepEqual(peopleForView([restored], "people"), [restored]);
  assert.deepEqual(peopleForView([restored], "withdrawn"), []);
  assert.deepEqual(people.map(p => p.id), [retired.id, legacy.id, active.id]);
});

test("validates required fields, zero amounts, duplicate documents and editing the same person", () => {
  assert.equal(validatePerson(person, []), "");
  assert.equal(validatePerson({ ...person, valorMensual: 0 }, []), "");
  assert.match(validatePerson({ ...person, nombre: "  " }, []), /Completa/);
  assert.match(
    validatePerson({ ...person, cedula: "123 456" }, [person]),
    /ya está registrada/,
  );
  assert.equal(validatePerson(person, [person], person.id), "");
  assert.match(
    validatePerson(person, [{ ...person, estado: "DESVINCULADO" }]),
    /ya está registrada/,
  );
});

test("rejects invalid dates and nonfinite or negative monetary amounts", () => {
  assert.equal(calculateAge("2025-02-30"), "");
  assert.equal(calculateAge("2999-01-01"), "");
  assert.equal(calculateAge(localDate()), 0);
  for (const valorMensual of [-1, NaN, Infinity])
    assert.match(validatePerson({ ...person, valorMensual }, []), /valores/);
  assert.match(
    validatePerson({ ...person, fechaVinculacion: "1980-01-01" }, []),
    /vinculación/,
  );
  assert.match(
    validatePerson({ ...person, fechaVinculacion: "2999-01-01" }, []),
    /vinculación/,
  );
});

test("legacy records without a start date can be edited without inventing one", () => {
  const legacy = { ...person, fechaVinculacion: undefined };
  assert.equal(validatePerson(legacy, [legacy], legacy.id), "");
  assert.match(validatePerson(legacy, []), /vinculación/);
  assert.match(validatePerson(legacy, [person], person.id), /vinculación/);
  assert.match(validatePerson({ ...legacy, fechaVinculacion: "2026-02-30" }, [legacy], legacy.id), /vinculación/);
});

test("monthly reporting periods roll over automatically and constrain retirement dates", () => {
  const september = monthlyReportingPeriod(new Date(2026, 8, 17, 12));
  assert.deepEqual(september, {
    start: "2026-08-01",
    end: "2026-09-01",
    enabledFrom: "2026-09-01",
    enabledUntil: "2026-09-30",
    monthKey: "2026-09",
  });
  assert.equal(dateIsInReportingPeriod("2026-08-01", september), true);
  assert.equal(dateIsInReportingPeriod("2026-08-19", september), true);
  assert.equal(dateIsInReportingPeriod("2026-09-01", september), true);
  assert.equal(dateIsInReportingPeriod("2026-07-31", september), false);
  assert.equal(dateIsInReportingPeriod("2026-09-02", september), false);

  assert.deepEqual(monthlyReportingPeriod(new Date(2027, 0, 10, 12)), {
    start: "2026-12-01",
    end: "2027-01-01",
    enabledFrom: "2027-01-01",
    enabledUntil: "2027-01-31",
    monthKey: "2027-01",
  });
});

test("monthly signature is order independent and changes when a retirement changes", () => {
  const retired = {
    ...person,
    id: "person-2",
    cedula: "987",
    estado: "DESVINCULADO",
    fechaDesvinculacion: "2026-09-01",
  };
  assert.equal(
    createDataSignature([person, retired]),
    createDataSignature([retired, person]),
  );
  assert.notEqual(
    createDataSignature([person, retired]),
    createDataSignature([
      person,
      { ...retired, fechaDesvinculacion: "2026-09-02" },
    ]),
  );
  assert.notEqual(
    createDataSignature([person]),
    createDataSignature([{ ...person, valorMensual: 32000 }]),
  );
});

test("undoing retirement restores the original novelty and amounts", () => {
  const retired = {
    ...person,
    estado: "DESVINCULADO",
    tipoNovedad: "RETIRO",
    valorNovedad: 14000,
    diasNovedad: 14,
    fechaDesvinculacion: "2026-09-17",
    tipoNovedadAnterior: "INGRESO",
    valorNovedadAnterior: 30000,
    diasNovedadAnterior: 30,
  };
  assert.deepEqual(restoredWithdrawal(retired), {
    estado: "ACTIVO",
    fechaDesvinculacion: null,
    tipoNovedad: "INGRESO",
    valorNovedad: 30000,
    diasNovedad: 30,
  });
});

test("legacy retirements without a saved novelty clear withdrawal amounts", () => {
  assert.deepEqual(restoredWithdrawal({ ...person, estado: "DESVINCULADO" }), {
    estado: "ACTIVO",
    fechaDesvinculacion: null,
    tipoNovedad: null,
    valorNovedad: null,
    diasNovedad: null,
  });
});

test("preserves the existing withdrawal billing convention across month boundaries", () => {
  assert.deepEqual(calculateWithdrawalCharge(4450, "2026-07-09"), {
    days: 23,
    amount: (4450 / 30) * 23,
  });
  assert.deepEqual(calculateWithdrawalCharge(4450, "2026-08-01"), {
    days: 0,
    amount: 0,
  });
  assert.deepEqual(calculateWithdrawalCharge(30000, "2026-09-17"), {
    days: 14,
    amount: 14000,
  });
  assert.deepEqual(calculateWithdrawalCharge(30000, "2026-09-30"), {
    days: 1,
    amount: 1000,
  });
  assert.deepEqual(calculateWithdrawalCharge(30000, "2024-02-28"), {
    days: 2,
    amount: 2000,
  });
});
