import React, { useState, useEffect } from 'react';
import { useStore, ClientInput } from '../store';
import { SERVICE_PLANS, STATUS_ORDER, STATUS_LABELS } from '../constants';
import { ServicePlan, ClientStatus } from '../types';

interface Props {
  clientId?: string;
}

const ClientForm: React.FC<Props> = ({ clientId }) => {
  const { state, addClient, updateClient } = useStore();
  const existing = clientId ? state.clients.find(c => c.id === clientId) : null;
  const isEditing = !!existing;

  const [form, setForm] = useState({
    clientName: '',
    rut: '',
    contactName: '',
    whatsApp: '',
    email: '',
    servicePlan: 'IVA' as ServicePlan,
    status: 'Onboarding' as ClientStatus,
    month: new Date().toISOString().slice(0, 7),
    dueDate: '',
    nextAction: '',
    notes: '',
    driveFolderURL: '',
    paymentLinkURL: '',
  });

  useEffect(() => {
    if (existing) {
      setForm({
        clientName: existing.clientName,
        rut: existing.rut,
        contactName: existing.contactName,
        whatsApp: existing.whatsApp,
        email: existing.email,
        servicePlan: existing.servicePlan,
        status: existing.status,
        month: existing.month,
        dueDate: existing.dueDate,
        nextAction: existing.nextAction,
        notes: existing.notes,
        driveFolderURL: existing.driveFolderURL,
        paymentLinkURL: existing.paymentLinkURL,
      });
    }
  }, [existing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && existing) {
      updateClient({
        ...existing,
        ...form,
      });
      window.location.hash = `#/cliente/${existing.id}`;
    } else {
      const client = addClient(form as ClientInput);
      window.location.hash = `#/cliente/${client.id}`;
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <a
          href={isEditing ? `#/cliente/${clientId}` : '#/clientes'}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
        >
          <span className="material-icons-outlined">arrow_back</span>
        </a>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Información General</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente / Razón Social *
              </label>
              <input
                type="text"
                required
                value={form.clientName}
                onChange={e => handleChange('clientName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: Comercial Los Andes SpA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RUT *</label>
              <input
                type="text"
                required
                value={form.rut}
                onChange={e => handleChange('rut', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: 76.123.456-7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Contacto *
              </label>
              <input
                type="text"
                required
                value={form.contactName}
                onChange={e => handleChange('contactName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: María González"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="text"
                value={form.whatsApp}
                onChange={e => handleChange('whatsApp', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: +56912345678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: maria@empresa.cl"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Servicio y Estado</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan de Servicio *
              </label>
              <select
                value={form.servicePlan}
                onChange={e => handleChange('servicePlan', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {SERVICE_PLANS.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {!isEditing && (
                <p className="text-xs text-gray-400 mt-1">
                  La lista de verificación se generará automáticamente según el plan
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={form.status}
                onChange={e => handleChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Período (Mes)
              </label>
              <input
                type="month"
                value={form.month}
                onChange={e => handleChange('month', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => handleChange('dueDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Enlaces y Notas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Carpeta de Drive
              </label>
              <input
                type="url"
                value={form.driveFolderURL}
                onChange={e => handleChange('driveFolderURL', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="https://drive.google.com/drive/folders/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Enlace de Pago
              </label>
              <input
                type="url"
                value={form.paymentLinkURL}
                onChange={e => handleChange('paymentLinkURL', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="https://pay.example.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Próxima Acción
              </label>
              <input
                type="text"
                value={form.nextAction}
                onChange={e => handleChange('nextAction', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Ej: Esperar documentos de febrero"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                value={form.notes}
                onChange={e => handleChange('notes', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                placeholder="Notas internas..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end">
          <a
            href={isEditing ? `#/cliente/${clientId}` : '#/clientes'}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </a>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
