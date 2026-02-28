import React, { useState } from 'react';

const navItems = [
  { href: '#/', icon: 'dashboard', label: 'Panel' },
  { href: '#/clientes', icon: 'people', label: 'Clientes' },
  { href: '#/kanban', icon: 'view_kanban', label: 'Tablero' },
  { href: '#/plantillas', icon: 'description', label: 'Plantillas' },
  { href: '#/config', icon: 'settings', label: 'Configuración' },
];

function isActive(href: string): boolean {
  const hash = window.location.hash || '#/';
  if (href === '#/') return hash === '#/' || hash === '#' || hash === '';
  return hash.startsWith(href);
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="material-icons-outlined text-white text-xl">account_balance</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Portal Contable</h1>
              <p className="text-xs text-gray-500 font-medium">Lite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span
                  className={`material-icons-outlined text-xl ${
                    active ? 'text-indigo-600' : 'text-gray-400'
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">Portal Contable Lite v1.0</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <span className="material-icons-outlined text-gray-600">menu</span>
          </button>
          <span className="font-semibold text-gray-900">Portal Contable Lite</span>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
