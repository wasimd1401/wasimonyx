import React, { useState } from 'react';
import { useStore, fillTemplate } from '../store';
import { MessageTemplate, Client } from '../types';

const MessageTemplates: React.FC = () => {
  const { state, addMessageTemplate, updateMessageTemplate, deleteMessageTemplate } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(
    state.messageTemplates.length > 0 ? state.messageTemplates[0].id : null
  );
  const [editName, setEditName] = useState('');
  const [editBody, setEditBody] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [previewClient, setPreviewClient] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const selected = state.messageTemplates.find(t => t.id === selectedId);
  const client = state.clients.find(c => c.id === previewClient);

  const selectTemplate = (tpl: MessageTemplate) => {
    setSelectedId(tpl.id);
    setEditName(tpl.name);
    setEditBody(tpl.body);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
    setSelectedId(null);
    setEditName('');
    setEditBody('');
  };

  const saveTemplate = () => {
    if (!editName.trim() || !editBody.trim()) return;
    if (isCreating) {
      addMessageTemplate({ name: editName, body: editBody });
      setIsCreating(false);
    } else if (selectedId) {
      updateMessageTemplate({ id: selectedId, name: editName, body: editBody });
    }
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteMessageTemplate(selectedId);
      setSelectedId(null);
      setEditName('');
      setEditBody('');
    }
  };

  const copyFilled = () => {
    if (!client || !editBody) return;
    const filled = fillTemplate(editBody, client);
    navigator.clipboard.writeText(filled);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sync editor when selecting a template
  React.useEffect(() => {
    if (selected && !isCreating) {
      setEditName(selected.name);
      setEditBody(selected.body);
    }
  }, [selected, isCreating]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Plantillas de Mensajes</h1>
        <p className="text-gray-500 mt-1">
          Crea plantillas con variables como {'{ClientName}'}, {'{Month}'}, {'{DueDate}'}, {'{MissingDocs}'}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template list */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Plantillas</h2>
            <button
              onClick={startCreating}
              className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Nueva plantilla"
            >
              <span className="material-icons-outlined text-lg">add</span>
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {state.messageTemplates.map(tpl => (
              <button
                key={tpl.id}
                onClick={() => selectTemplate(tpl)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  selectedId === tpl.id && !isCreating
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <p className="text-sm font-medium">{tpl.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{tpl.body.slice(0, 60)}...</p>
              </button>
            ))}
            {state.messageTemplates.length === 0 && (
              <div className="p-6 text-center text-gray-400 text-sm">
                No hay plantillas creadas
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 space-y-6">
          {(selectedId || isCreating) ? (
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  {isCreating ? 'Nueva Plantilla' : 'Editar Plantilla'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Ej: Recordatorio de documentos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea
                      value={editBody}
                      onChange={e => setEditBody(e.target.value)}
                      rows={8}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono"
                      placeholder="Hola {ClientName}, te recordamos que..."
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">Variables disponibles:</p>
                    <div className="flex flex-wrap gap-2">
                      {['{ClientName}', '{Month}', '{DueDate}', '{MissingDocs}', '{ServicePlan}', '{DriveFolder}', '{PaymentLink}', '{PortalLink}'].map(v => (
                        <code key={v} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-indigo-600">
                          {v}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={saveTemplate}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      {isCreating ? 'Crear Plantilla' : 'Guardar Cambios'}
                    </button>
                    {!isCreating && (
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview with client */}
              {!isCreating && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Vista Previa</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <select
                      value={previewClient}
                      onChange={e => setPreviewClient(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="">Seleccionar cliente...</option>
                      {state.clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.clientName}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={copyFilled}
                      disabled={!client}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        client
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span className="material-icons-outlined text-lg">
                        {copied ? 'check' : 'content_copy'}
                      </span>
                      {copied ? '¡Copiado!' : 'Copiar Mensaje'}
                    </button>
                  </div>
                  {client ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre className="text-sm text-green-900 whitespace-pre-wrap font-sans">
                        {fillTemplate(editBody, client)}
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <pre className="text-sm text-gray-500 whitespace-pre-wrap font-sans">
                        {editBody || 'El mensaje aparecerá aquí...'}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
              <span className="material-icons-outlined text-4xl text-gray-300 mb-3 block">
                description
              </span>
              <p className="text-gray-500">Selecciona una plantilla o crea una nueva</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageTemplates;
