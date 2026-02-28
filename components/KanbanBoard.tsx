import React, { useState } from 'react';
import { useStore } from '../store';
import { STATUS_ORDER, STATUS_LABELS, STATUS_COLORS, STATUS_KANBAN_COLORS } from '../constants';
import { ClientStatus } from '../types';

const KanbanBoard: React.FC = () => {
  const { state, updateClientStatus } = useStore();
  const [dragOverCol, setDragOverCol] = useState<ClientStatus | null>(null);

  const handleDragStart = (e: React.DragEvent, clientId: string) => {
    e.dataTransfer.setData('text/plain', clientId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: ClientStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(status);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e: React.DragEvent, status: ClientStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const clientId = e.dataTransfer.getData('text/plain');
    if (clientId) {
      updateClientStatus(clientId, status);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tablero</h1>
        <p className="text-gray-500 mt-1">Arrastra los clientes entre columnas para cambiar su estado</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {STATUS_ORDER.map(status => {
          const clients = state.clients.filter(c => c.status === status);
          const color = STATUS_COLORS[status];
          const kanbanColor = STATUS_KANBAN_COLORS[status];
          const isDragOver = dragOverCol === status;

          return (
            <div
              key={status}
              className={`flex-shrink-0 w-64 lg:w-72 flex flex-col bg-gray-50 rounded-xl border-t-4 ${kanbanColor} ${
                isDragOver ? 'bg-indigo-50 ring-2 ring-indigo-300' : ''
              } transition-all`}
              onDragOver={e => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, status)}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                    {STATUS_LABELS[status]}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full">
                  {clients.length}
                </span>
              </div>

              <div className="flex-1 px-3 pb-3 space-y-2 overflow-y-auto">
                {clients.length === 0 && (
                  <div className="text-center py-8 text-gray-300">
                    <span className="material-icons-outlined text-3xl">inbox</span>
                    <p className="text-xs mt-1">Sin clientes</p>
                  </div>
                )}
                {clients.map(client => {
                  const checked = client.checklist.filter(c => c.checked).length;
                  const total = client.checklist.length;
                  const progress = total > 0 ? Math.round((checked / total) * 100) : 0;

                  return (
                    <div
                      key={client.id}
                      draggable
                      onDragStart={e => handleDragStart(e, client.id)}
                      className="bg-white rounded-lg border border-gray-200 p-3.5 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                    >
                      <a
                        href={`#/cliente/${client.id}`}
                        className="block"
                        onClick={e => e.stopPropagation()}
                      >
                        <p className="text-sm font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                          {client.clientName}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">{client.rut}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                            {client.servicePlan}
                          </span>
                          {client.month && (
                            <span className="text-xs text-gray-400">{client.month}</span>
                          )}
                        </div>
                        {total > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Checklist</span>
                              <span className="text-xs font-medium text-gray-600">
                                {checked}/{total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${
                                  progress === 100
                                    ? 'bg-green-500'
                                    : progress > 50
                                    ? 'bg-indigo-500'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
