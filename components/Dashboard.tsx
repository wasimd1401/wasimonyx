import React, { useState } from 'react';
import { useStore } from '../store';
import { STATUS_ORDER, STATUS_LABELS, STATUS_COLORS } from '../constants';

const Dashboard: React.FC = () => {
  const { state } = useStore();
  const [linkCopied, setLinkCopied] = useState(false);

  const registrationLink = `${window.location.origin}${window.location.pathname}#/registro`;

  const copyRegistrationLink = () => {
    navigator.clipboard.writeText(registrationLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };
  const { clients } = state;

  const statusCounts = STATUS_ORDER.map(status => ({
    status,
    count: clients.filter(c => c.status === status).length,
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const in14Days = new Date(today);
  in14Days.setDate(in14Days.getDate() + 14);

  const upcoming = clients
    .filter(c => {
      if (!c.dueDate) return false;
      const due = new Date(c.dueDate);
      return due >= today && due <= in14Days;
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const missingDocsClients = clients.filter(c => c.status === 'MissingDocs');

  const formatDate = (d: string) => {
    if (!d) return '—';
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const daysUntil = (d: string) => {
    const due = new Date(d + 'T12:00:00');
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Mañana';
    return `${diff} días`;
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel</h1>
          <p className="text-gray-500 mt-1">Resumen general de clientes y vencimientos</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#/registro"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <span className="material-icons-outlined text-lg">open_in_new</span>
            Ver formulario
          </a>
          <button
            onClick={copyRegistrationLink}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              linkCopied
                ? 'bg-green-100 text-green-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <span className="material-icons-outlined text-lg">
              {linkCopied ? 'check' : 'link'}
            </span>
            {linkCopied ? 'Enlace copiado' : 'Copiar enlace de registro'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statusCounts.map(({ status, count }) => {
          const color = STATUS_COLORS[status];
          return (
            <div
              key={status}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${color.dot}`} />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {STATUS_LABELS[status]}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-amber-500">schedule</span>
              Vencimientos Próximos
            </h2>
          </div>
          {upcoming.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <span className="material-icons-outlined text-4xl mb-2 block">event_available</span>
              No hay vencimientos en los próximos 14 días
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {upcoming.map(client => (
                <a
                  key={client.id}
                  href={`#/cliente/${client.id}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.clientName}</p>
                    <p className="text-xs text-gray-500">{client.servicePlan} · {client.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{formatDate(client.dueDate)}</p>
                    <p className={`text-xs font-medium ${
                      daysUntil(client.dueDate) === 'Hoy' ? 'text-red-600' :
                      daysUntil(client.dueDate) === 'Mañana' ? 'text-amber-600' : 'text-gray-400'
                    }`}>{daysUntil(client.dueDate)}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-red-500">warning</span>
              Clientes con Docs Pendientes
            </h2>
          </div>
          {missingDocsClients.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <span className="material-icons-outlined text-4xl mb-2 block">check_circle</span>
              Todos los clientes tienen documentos al día
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {missingDocsClients.map(client => {
                const missing = client.checklist.filter(c => !c.checked).length;
                const total = client.checklist.length;
                return (
                  <a
                    key={client.id}
                    href={`#/cliente/${client.id}`}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client.clientName}</p>
                      <p className="text-xs text-gray-500">{client.contactName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        {missing}/{total} pendientes
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {clients.length === 0 && (
        <div className="mt-8 bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <span className="material-icons-outlined text-5xl text-gray-300 mb-4 block">group_add</span>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Comienza agregando tu primer cliente</h3>
          <p className="text-gray-500 mb-4">Haz clic en el botón para registrar un nuevo cliente y empezar a gestionar su documentación.</p>
          <a
            href="#/nuevo-cliente"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <span className="material-icons-outlined text-lg">add</span>
            Agregar Cliente
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
