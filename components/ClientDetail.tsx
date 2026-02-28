import React, { useState } from 'react';
import { useStore, fillTemplate } from '../store';
import { STATUS_ORDER, STATUS_LABELS, STATUS_COLORS } from '../constants';
import { ClientStatus } from '../types';

interface Props {
  clientId: string;
}

const ClientDetail: React.FC<Props> = ({ clientId }) => {
  const { state, toggleChecklist, updateClientStatus, updateClient } = useStore();
  const client = state.clients.find(c => c.id === clientId);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [notes, setNotes] = useState(client?.notes || '');
  const [nextAction, setNextAction] = useState(client?.nextAction || '');

  if (!client) {
    return (
      <div className="text-center py-20">
        <span className="material-icons-outlined text-5xl text-gray-300 mb-4 block">person_off</span>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Cliente no encontrado</h2>
        <a href="#/clientes" className="text-indigo-600 hover:underline text-sm">
          Volver a la lista de clientes
        </a>
      </div>
    );
  }

  const checkedCount = client.checklist.filter(c => c.checked).length;
  const totalCount = client.checklist.length;
  const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  const color = STATUS_COLORS[client.status];

  const portalUrl = `${window.location.origin}${window.location.pathname}#/portal/${client.portalKey}`;

  const copyPortalLink = () => {
    navigator.clipboard.writeText(portalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyTemplate = (templateId: string) => {
    const tpl = state.messageTemplates.find(t => t.id === templateId);
    if (!tpl) return;
    const filled = fillTemplate(tpl.body, client);
    navigator.clipboard.writeText(filled);
    setCopiedTemplate(templateId);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  const saveNotes = () => {
    updateClient({ ...client, notes, nextAction });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <a
          href="#/clientes"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
        >
          <span className="material-icons-outlined">arrow_back</span>
        </a>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{client.clientName}</h1>
          <p className="text-gray-500">{client.rut} · {client.servicePlan}</p>
        </div>
        <a
          href={`#/editar-cliente/${client.id}`}
          className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <span className="material-icons-outlined text-lg">edit</span>
          Editar
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - info + checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status + Quick actions */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm font-medium text-gray-500">Estado:</span>
              {STATUS_ORDER.map(s => (
                <button
                  key={s}
                  onClick={() => updateClientStatus(client.id, s)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                    client.status === s
                      ? `${STATUS_COLORS[s].bg} ${STATUS_COLORS[s].text} ring-2 ring-offset-1 ring-${STATUS_COLORS[s].dot.replace('bg-', '')}`
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${client.status === s ? STATUS_COLORS[s].dot : 'bg-gray-400'}`} />
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={copyPortalLink}
                className="inline-flex items-center gap-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <span className="material-icons-outlined text-sm">link</span>
                {copiedLink ? '¡Copiado!' : 'Copiar Link del Portal'}
              </button>
              {client.driveFolderURL && (
                <a
                  href={client.driveFolderURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="material-icons-outlined text-sm">folder</span>
                  Abrir Drive
                </a>
              )}
              {client.paymentLinkURL && (
                <a
                  href={client.paymentLinkURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <span className="material-icons-outlined text-sm">payment</span>
                  Link de Pago
                </a>
              )}
            </div>
          </div>

          {/* Client info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-gray-400">person</span>
              Información del Cliente
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Contacto</p>
                <p className="text-sm font-medium text-gray-900">{client.contactName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">{client.email || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">WhatsApp</p>
                <p className="text-sm font-medium text-gray-900">{client.whatsApp || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Período</p>
                <p className="text-sm font-medium text-gray-900">{client.month || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Vencimiento</p>
                <p className="text-sm font-medium text-gray-900">
                  {client.dueDate
                    ? new Date(client.dueDate + 'T12:00:00').toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Creado</p>
                <p className="text-sm font-medium text-gray-900">{client.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <span className="material-icons-outlined text-lg text-gray-400">checklist</span>
                Lista de Verificación
              </h2>
              <span className="text-sm font-medium text-gray-500">
                {checkedCount}/{totalCount}
              </span>
            </div>
            {totalCount > 0 && (
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all ${
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
                <button
                  key={entry.id}
                  onClick={() => toggleChecklist(client.id, entry.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    entry.checked ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-gray-50'
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
                </button>
              ))}
              {client.checklist.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No hay ítems en la lista de verificación
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right column - notes, templates, actions */}
        <div className="space-y-6">
          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-gray-400">sticky_note_2</span>
              Notas
            </h2>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              placeholder="Notas internas del cliente..."
            />
            <div className="mt-3">
              <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                Próxima Acción
              </label>
              <input
                type="text"
                value={nextAction}
                onChange={e => setNextAction(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="¿Qué sigue?"
              />
            </div>
            <button
              onClick={saveNotes}
              className="mt-3 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Guardar Notas
            </button>
          </div>

          {/* Message Templates */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-gray-400">chat</span>
              Enviar Mensaje
            </h2>
            <div className="space-y-2">
              {state.messageTemplates.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => copyTemplate(tpl.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                >
                  <span className="text-sm text-gray-700">{tpl.name}</span>
                  <span className="material-icons-outlined text-lg text-gray-400">
                    {copiedTemplate === tpl.id ? 'check' : 'content_copy'}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Haz clic para copiar el mensaje con los datos del cliente
            </p>
          </div>

          {/* Portal link */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-gray-400">public</span>
              Portal del Cliente
            </h2>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-500 font-mono break-all">{portalUrl}</p>
            </div>
            <button
              onClick={copyPortalLink}
              className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons-outlined text-lg">content_copy</span>
              {copiedLink ? '¡Link Copiado!' : 'Copiar Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
