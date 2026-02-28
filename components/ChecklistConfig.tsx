import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { SERVICE_PLANS } from '../constants';
import { ServicePlan } from '../types';

const ChecklistConfig: React.FC = () => {
  const { state, setChecklistTemplate } = useStore();
  const [activePlan, setActivePlan] = useState<ServicePlan>('IVA');
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const template = state.checklistTemplates.find(t => t.servicePlan === activePlan);
    setItems(template?.items || []);
    setSaved(false);
  }, [activePlan, state.checklistTemplates]);

  const addItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, trimmed]);
    setNewItem('');
    setSaved(false);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setSaved(false);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setItems(newItems);
    setSaved(false);
  };

  const handleSave = () => {
    setChecklistTemplate({ servicePlan: activePlan, items });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configuración de Checklists</h1>
        <p className="text-gray-500 mt-1">
          Define los ítems de verificación para cada plan de servicio.
          Estos se aplicarán automáticamente al crear nuevos clientes.
        </p>
      </div>

      {/* Plan tabs */}
      <div className="flex gap-2 mb-6">
        {SERVICE_PLANS.map(plan => (
          <button
            key={plan}
            onClick={() => setActivePlan(plan)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePlan === plan
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {plan}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Ítems para plan {activePlan}
          </h2>
          <p className="text-xs text-gray-400 mt-1">{items.length} ítems configurados</p>
        </div>

        <div className="p-5">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <span className="material-icons-outlined text-4xl mb-2 block">playlist_add</span>
              <p className="text-sm">No hay ítems configurados para este plan</p>
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 group"
                >
                  <span className="text-xs text-gray-400 font-mono w-5 text-center">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm text-gray-700">{item}</span>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Mover arriba"
                    >
                      <span className="material-icons-outlined text-sm">arrow_upward</span>
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === items.length - 1}
                      className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Mover abajo"
                    >
                      <span className="material-icons-outlined text-sm">arrow_downward</span>
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 rounded text-gray-400 hover:text-red-600"
                      title="Eliminar"
                    >
                      <span className="material-icons-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add new item */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Agregar nuevo ítem..."
            />
            <button
              onClick={addItem}
              disabled={!newItem.trim()}
              className="px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Los cambios solo aplican a clientes nuevos. Los existentes no se modifican.
          </p>
          <button
            onClick={handleSave}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {saved ? '¡Guardado!' : 'Guardar Configuración'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistConfig;
