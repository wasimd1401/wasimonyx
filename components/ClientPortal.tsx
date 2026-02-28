import React, { useState } from 'react';
import { useStore } from '../store';
import { STATUS_LABELS, STATUS_COLORS, FAQ_ITEMS } from '../constants';

interface Props {
  portalKey: string;
}

const ClientPortal: React.FC<Props> = ({ portalKey }) => {
  const { state } = useStore();
  const client = state.clients.find(c => c.portalKey === portalKey);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-outlined text-3xl text-gray-400">lock</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Portal no encontrado</h1>
          <p className="text-gray-500">
            El enlace que usaste no es válido o ya no está disponible. Por favor contacta a tu contador para obtener un enlace actualizado.
          </p>
        </div>
      </div>
    );
  }

  const checkedCount = client.checklist.filter(c => c.checked).length;
  const totalCount = client.checklist.length;
  const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  const color = STATUS_COLORS[client.status];

  const formatDate = (d: string) => {
    if (!d) return '—';
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="material-icons-outlined text-white text-xl">account_balance</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Portal Contable</h1>
              <p className="text-xs text-gray-500">Portal del Cliente</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 space-y-6">
        {/* Client info card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.clientName}</h2>
              <p className="text-gray-500 mt-1">
                Plan: <span className="font-medium text-gray-700">{client.servicePlan}</span>
                {client.month && <> · Período: <span className="font-medium text-gray-700">{client.month}</span></>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${color.bg} ${color.text}`}>
                <span className={`w-2 h-2 rounded-full ${color.dot}`} />
                {STATUS_LABELS[client.status]}
              </span>
            </div>
          </div>
          {client.dueDate && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="material-icons-outlined text-amber-600">event</span>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Fecha de vencimiento: {formatDate(client.dueDate)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          {client.driveFolderURL && (
            <a
              href={client.driveFolderURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-icons-outlined text-blue-600 text-2xl">cloud_upload</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Subir Documentos</p>
                <p className="text-xs text-gray-500">Abre la carpeta de Google Drive</p>
              </div>
            </a>
          )}
          {client.paymentLinkURL && (
            <a
              href={client.paymentLinkURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-icons-outlined text-green-600 text-2xl">payments</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Realizar Pago</p>
                <p className="text-xs text-gray-500">Ir al enlace de pago</p>
              </div>
            </a>
          )}
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-gray-400">checklist</span>
              Lista de Verificación
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {checkedCount} de {totalCount} completados
            </span>
          </div>

          {totalCount > 0 && (
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  progress === 100
                    ? 'bg-green-500'
                    : progress > 50
                    ? 'bg-indigo-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="space-y-1">
            {client.checklist.map(entry => (
              <div
                key={entry.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  entry.checked ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <span
                  className={`material-icons-outlined text-lg ${
                    entry.checked ? 'text-green-600' : 'text-gray-300'
                  }`}
                >
                  {entry.checked ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span
                  className={`text-sm ${
                    entry.checked ? 'text-green-800 line-through' : 'text-gray-700'
                  }`}
                >
                  {entry.label}
                </span>
              </div>
            ))}
            {client.checklist.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">
                No hay ítems en la lista de verificación
              </p>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-icons-outlined text-lg text-gray-400">help_outline</span>
            Preguntas Frecuentes
          </h3>
          <div className="space-y-2">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-lg">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  <span className="material-icons-outlined text-gray-400 text-lg transition-transform flex-shrink-0">
                    {openFAQ === index ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="material-icons-outlined text-lg text-gray-400">support_agent</span>
            ¿Necesitas ayuda?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Si tienes dudas o necesitas asistencia, no dudes en contactarnos:
          </p>
          <div className="flex flex-wrap gap-3">
            {client.whatsApp && (
              <a
                href={`https://wa.me/${client.whatsApp.replace(/[^0-9+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <span className="material-icons-outlined text-lg">chat</span>
                WhatsApp
              </a>
            )}
            {client.email && (
              <a
                href={`mailto:${client.email}`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <span className="material-icons-outlined text-lg">email</span>
                Email
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">
            Portal Contable Lite · Powered by tu firma contable
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
