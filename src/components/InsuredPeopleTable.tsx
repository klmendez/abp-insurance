import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLocalPeople(people);
  }, [people]);

  const filteredPeople = useMemo(() => {
    if (!searchTerm.trim()) return localPeople;
    const q = searchTerm.trim().toLowerCase();
    return localPeople.filter(
      (p) =>
        p.nombre?.toLowerCase().includes(q) ||
        p.cedula?.toLowerCase().includes(q)
    );
  }, [localPeople, searchTerm]);

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
      await updateDoc(ref, {
        ...editForm,
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
        editForm
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

  const deletePerson = async (person: InsuredPerson) => {
    if (!confirm(`¿Eliminar a ${person.nombre}? Se notificará a tu asesor.`)) return;
    try {
      // Actualizar UI inmediatamente
      setLocalPeople((prev) => prev.filter((p) => p.id !== person.id));
      const ref = doc(db, "clientPolicies", policyId, "insuredPeople", person.id);
      await deleteDoc(ref);
      await createChangeNotification(
        "delete",
        clientUid,
        clientEmail,
        clientName,
        policyId,
        person.id,
        person
      );
      showNotif("Asegurado eliminado y notificado a tu asesor.");
      onChange();
    } catch (e) {
      console.error(e);
      showNotif("Error eliminando.");
      // Revertir si falla
      setLocalPeople((prev) => [...prev, person]);
    }
  };

  return (
    <section className="mb-10">
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
          <span className="text-xs text-slate-400">{filteredPeople.length} registros</span>
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o cédula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-abp-gold"
        />
      </div>

      {localPeople.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">
          No hay asegurados registrados. Contacta a tu asesor.
        </p>
      ) : filteredPeople.length === 0 ? (
        <p className="text-sm text-slate-500 py-4">
          No hay resultados para "{searchTerm}".
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-medium text-slate-500 uppercase">
                <th className="py-2 pr-4">REG</th>
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2 pr-4">Cédula</th>
                <th className="py-2 pr-4">Sexo</th>
                <th className="py-2 pr-4">Fecha Nac.</th>
                <th className="py-2 pr-4">Edad</th>
                <th className="py-2 pr-4">Extraprima</th>
                <th className="py-2 pr-4">Valor Mensual</th>
                <th className="py-2 pr-4">Observaciones</th>
                <th className="py-2 pr-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPeople.map((p) =>
                editingId === p.id ? (
                  <tr key={p.id} className="bg-slate-50">
                    <td className="py-2 pr-4">
                      <input
                        className="w-12 border border-slate-300 rounded px-1 py-0.5 text-xs"
                        value={editForm.reg ?? ""}
                        onChange={(e) => setEditForm((f) => ({ ...f, reg: e.target.value }))}
                      />
                    </td>
                    <td className="py-2 pr-4">
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
                    <td className="py-2 pr-2 text-right">
                      <button
                        onClick={() => saveEdit(p)}
                        disabled={saving}
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mr-2"
                        title="Guardar"
                      >
                        <FiSave className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center text-slate-400 hover:text-slate-600"
                        title="Cancelar"
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id} className="hover:bg-slate-100/40 transition">
                    <td className="py-2 pr-4 text-slate-700">{p.reg}</td>
                    <td className="py-2 pr-4 text-slate-700 font-medium">{p.nombre}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.cedula}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.sexo}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.fechaNacimiento}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.edad}</td>
                    <td className="py-2 pr-4 text-slate-600">{p.extraprima}</td>
                    <td className="py-2 pr-4 text-slate-600">
                      {p.valorMensual ? `$${Number(p.valorMensual).toLocaleString("es-CO")}` : ""}
                    </td>
                    <td className="py-2 pr-4 text-slate-600">{p.observaciones}</td>
                    <td className="py-2 pr-2 text-right">
                      <button
                        onClick={() => startEdit(p)}
                        className="inline-flex items-center text-abp-gold hover:text-amber-600 mr-2"
                        title="Editar"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deletePerson(p)}
                        className="inline-flex items-center text-red-500 hover:text-red-600"
                        title="Eliminar"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
