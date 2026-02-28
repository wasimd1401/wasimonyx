import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClientsTable from './components/ClientsTable';
import KanbanBoard from './components/KanbanBoard';
import ClientDetail from './components/ClientDetail';
import ClientForm from './components/ClientForm';
import MessageTemplates from './components/MessageTemplates';
import ChecklistConfig from './components/ChecklistConfig';
import ClientPortal from './components/ClientPortal';

function parseRoute(hash: string): { page: string; param?: string } {
  const h = hash.replace(/^#\/?/, '');
  if (!h || h === '/') return { page: 'dashboard' };
  if (h === 'clientes') return { page: 'clientes' };
  if (h === 'kanban') return { page: 'kanban' };
  if (h === 'nuevo-cliente') return { page: 'nuevo-cliente' };
  if (h.startsWith('cliente/')) return { page: 'cliente', param: h.split('/')[1] };
  if (h.startsWith('editar-cliente/')) return { page: 'editar-cliente', param: h.split('/')[1] };
  if (h === 'plantillas') return { page: 'plantillas' };
  if (h === 'config') return { page: 'config' };
  if (h.startsWith('portal/')) return { page: 'portal', param: h.split('/')[1] };
  return { page: 'dashboard' };
}

const App: React.FC = () => {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handler = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (route.page === 'portal') {
    return <ClientPortal portalKey={route.param || ''} />;
  }

  let content: React.ReactNode;
  switch (route.page) {
    case 'clientes':
      content = <ClientsTable />;
      break;
    case 'kanban':
      content = <KanbanBoard />;
      break;
    case 'nuevo-cliente':
      content = <ClientForm />;
      break;
    case 'editar-cliente':
      content = <ClientForm clientId={route.param} />;
      break;
    case 'cliente':
      content = <ClientDetail clientId={route.param || ''} />;
      break;
    case 'plantillas':
      content = <MessageTemplates />;
      break;
    case 'config':
      content = <ChecklistConfig />;
      break;
    default:
      content = <Dashboard />;
  }

  return <Layout>{content}</Layout>;
};

export default App;
