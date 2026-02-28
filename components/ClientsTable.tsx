import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { STATUS_LABELS, STATUS_COLORS, SERVICE_PLANS, STATUS_ORDER } from '../constants';
import { ClientStatus, ServicePlan } from '../types';

const ClientsTable: React.FC = () => {
  const { state, deleteClient } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | ''>('');
  const [planFilter, setPlanFilter] = useState<ServicePlan | ''>('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return state.clients.filter(c => {
      const matchSearch =
        !search ||
        c.clientName.toLowerCase().includes(search.toLowerCase()) ||
        c.rut.toLowerCase().includes(search.toLowerCase()) ||
        c.contactName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || c.status === statusFilter;
      const matchPlan = !planFilter || c.servicePlan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [state.clients, search, statusFilter, planFilter]);

  const formatDate = (d: string) => {
    if (!d) return '—';
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 mt-1">{state.clients.length} clientes registrados</p>
        </div>
        <a
          href="#/nuevo-cliente"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
        >
          <span className="material-icons-outlined text-lg">add</span>
          Agregar Cliente
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-icons-outlined text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre, RUT, contacto o email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ClientStatus | '')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="">Todos los estados</option>
            {STATUS_ORDER.map(s => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select
            value={planFilter}
            onChange={e => setPlanFilter(e.target.value as ServicePlan | '')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="">Todos los planes</option>
            {SERVICE_PLANS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <span className="material-icons-outlined text-4xl mb-2 block">search_off</span>
            {state.clients.length === 0
              ? 'No hay clientes registrados'
              : 'No se encontraron resultados'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Cliente
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    RUT
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden md:table-cell">
                    Contacto
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Plan
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Estado
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                    Período
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3 hidden lg:table-cell">
                    Vencimiento
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(client => {
                  const color = STATUS_COLORS[client.status];
                  return (
                    <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <a
                          href={`#/cliente/${client.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {client.clientName}
                        </a>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{client.rut}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 hidden md:table-cell">
                        <div>{client.contactName}</div>
                        <div className="text-xs text-gray-400">{client.email}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                          {client.servicePlan}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                          {STATUS_LABELS[client.status]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 hidden lg:table-cell">
                        {client.month || '—'}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 hidden lg:table-cell">
                        {formatDate(client.dueDate)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`#/cliente/${client.id}`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Ver detalle"
                          >
                            <span className="material-icons-outlined text-lg">visibility</span>
                          </a>
                          <a
                            href={`#/editar-cliente/${client.id}`}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Editar"
                          >
                            <span className="material-icons-outlined text-lg">edit</span>
                          </a>
                          {confirmDelete === client.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  deleteClient(client.id);
                                  setConfirmDelete(null);
                                }}
                                className="p-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                title="Confirmar eliminar"
                              >
                                <span className="material-icons-outlined text-lg">check</span>
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                                title="Cancelar"
                              >
                                <span className="material-icons-outlined text-lg">close</span>
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(client.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Eliminar"
                            >
                              <span className="material-icons-outlined text-lg">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsTable;
