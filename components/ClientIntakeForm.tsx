import React, { useState } from 'react';
import { useStore } from '../store';
import { SERVICE_PLANS } from '../constants';
import { ServicePlan } from '../types';

const ClientIntakeForm: React.FC = () => {
  const { addClient } = useStore();

  // Read ?plan= from hash: #/registro?plan=Full
  const hashParams = window.location.hash.split('?')[1] || '';
  const urlPlan = new URLSearchParams(hashParams).get('plan') as ServicePlan | null;
  const preselectedPlan = urlPlan && SERVICE_PLANS.includes(urlPlan) ? urlPlan : '';

  const [form, setForm] = useState({
    clientName: '',
    rut: '',
    contactName: '',
    whatsApp: '',
    email: '',
    servicePlan: preselectedPlan as ServicePlan | '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [portalUrl, setPortalUrl] = useState('');

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatRut = (value: string) => {
    let clean = value.replace(/[^0-9kK]/g, '');
    if (clean.length > 1) {
      const body = clean.slice(0, -1);
      const dv = clean.slice(-1).toUpperCase();
      const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      clean = `${formatted}-${dv}`;
    }
    return clean;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setForm(prev => ({ ...prev, rut: formatted }));
    if (errors.rut) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.rut;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.clientName.trim()) errs.clientName = 'Requerido';
    if (!form.rut.trim()) errs.rut = 'Requerido';
    if (!form.contactName.trim()) errs.contactName = 'Requerido';
    if (!form.email.trim()) {
      errs.email = 'Requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email inválido';
    }
    if (!form.whatsApp.trim()) errs.whatsApp = 'Requerido';
    if (!form.servicePlan) errs.servicePlan = 'Selecciona un plan';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const client = addClient({
      clientName: form.clientName.trim(),
      rut: form.rut.trim(),
      contactName: form.contactName.trim(),
      whatsApp: form.whatsApp.trim(),
      email: form.email.trim(),
      servicePlan: form.servicePlan as ServicePlan,
      status: 'Onboarding',
      month,
      dueDate: '',
      nextAction: 'Revisión inicial de documentos',
      notes: form.notes.trim() ? `[Cliente] ${form.notes.trim()}` : '',
      driveFolderURL: '',
      paymentLinkURL: '',
    });

    const url = `${window.location.origin}${window.location.pathname}#/portal/${client.portalKey}`;
    setPortalUrl(url);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="material-icons-outlined text-green-600 text-3xl">check_circle</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Registro exitoso!</h2>
            <p className="text-gray-500 mb-6">
              Tu información ha sido recibida correctamente. Nuestro equipo contable revisará tus datos y te contactará pronto.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xs text-gray-500 mb-2">Tu portal personal:</p>
              <a
                href={portalUrl}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium break-all"
              >
                {portalUrl}
              </a>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Guarda este enlace. Aquí podrás ver el estado de tu trámite y la lista de documentos.
            </p>
            <a
              href={portalUrl}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <span className="material-icons-outlined text-lg">open_in_new</span>
              Ir a mi portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  const PLAN_DESCRIPTIONS: Record<string, string> = {
    IVA: 'Declaración mensual de IVA (F29)',
    Renta: 'Declaración anual de renta (F22)',
    'Nómina': 'Gestión de remuneraciones y liquidaciones',
    Full: 'Servicio contable integral (IVA + Renta + Nómina)',
  };

  const inputClass = (field: string) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="material-icons-outlined text-white text-lg">account_balance</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Portal Contable</h1>
            <p className="text-xs text-gray-500">Registro de nuevo cliente</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6">
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulario de Registro</h2>
          <p className="text-gray-500">
            Completa tus datos para iniciar el proceso de onboarding. Nuestro equipo te contactará para los siguientes pasos.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Company info section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-icons-outlined text-base text-gray-400">business</span>
                Datos de la Empresa
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre o Razón Social <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={set('clientName')}
                  className={inputClass('clientName')}
                  placeholder="Ej: Comercial Los Andes SpA"
                />
                {errors.clientName && (
                  <p className="text-xs text-red-600 mt-1">{errors.clientName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  RUT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.rut}
                  onChange={handleRutChange}
                  className={inputClass('rut')}
                  placeholder="Ej: 76.123.456-7"
                  maxLength={12}
                />
                {errors.rut && (
                  <p className="text-xs text-red-600 mt-1">{errors.rut}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact info section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-icons-outlined text-base text-gray-400">person</span>
                Datos de Contacto
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nombre del Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={set('contactName')}
                  className={inputClass('contactName')}
                  placeholder="Ej: María González"
                />
                {errors.contactName && (
                  <p className="text-xs text-red-600 mt-1">{errors.contactName}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    className={inputClass('email')}
                    placeholder="correo@empresa.cl"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.whatsApp}
                    onChange={set('whatsApp')}
                    className={inputClass('whatsApp')}
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.whatsApp && (
                    <p className="text-xs text-red-600 mt-1">{errors.whatsApp}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Service plan section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-icons-outlined text-base text-gray-400">description</span>
                Plan de Servicio
              </h3>
            </div>
            <div className="p-6">
              {errors.servicePlan && (
                <p className="text-xs text-red-600 mb-3">{errors.servicePlan}</p>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICE_PLANS.map(plan => {
                  const isSelected = form.servicePlan === plan;
                  return (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => {
                        setForm(prev => ({ ...prev, servicePlan: plan }));
                        if (errors.servicePlan) {
                          setErrors(prev => {
                            const next = { ...prev };
                            delete next.servicePlan;
                            return next;
                          });
                        }
                      }}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                          : errors.servicePlan
                          ? 'border-red-200 hover:border-red-300'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
                          {plan}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <span className="material-icons-outlined text-white text-sm">check</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{PLAN_DESCRIPTIONS[plan]}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notes section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-icons-outlined text-base text-gray-400">chat</span>
                Comentarios <span className="text-gray-400 font-normal">(opcional)</span>
              </h3>
            </div>
            <div className="p-6">
              <textarea
                value={form.notes}
                onChange={set('notes')}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="¿Algo que debamos saber? Ej: tipo de empresa, cantidad de empleados, situación tributaria actual..."
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <span className="material-icons-outlined text-lg">send</span>
              Enviar Registro
            </button>
            <p className="text-xs text-gray-400 text-center sm:text-left">
              Al enviar, aceptas que tu información sea procesada por nuestro equipo contable.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center py-8 mt-4">
          <p className="text-xs text-gray-400">
            Portal Contable Lite · Registro seguro
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientIntakeForm;
