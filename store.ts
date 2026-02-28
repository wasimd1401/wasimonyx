import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  Client,
  ChecklistEntry,
  ChecklistTemplate,
  MessageTemplate,
  AppState,
  ClientStatus,
} from './types';
import { DEFAULT_CHECKLIST_TEMPLATES, DEFAULT_MESSAGE_TEMPLATES } from './constants';

const STORAGE_KEY = 'portal-contable-lite';

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

function generatePortalKey(): string {
  return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
}

function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse errors
  }
  return {
    clients: [],
    checklistTemplates: [...DEFAULT_CHECKLIST_TEMPLATES],
    messageTemplates: [...DEFAULT_MESSAGE_TEMPLATES],
  };
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export type ClientInput = Omit<Client, 'id' | 'portalKey' | 'checklist' | 'createdAt'>;

interface StoreContextType {
  state: AppState;
  addClient: (data: ClientInput) => Client;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  toggleChecklist: (clientId: string, entryId: string) => void;
  updateClientStatus: (clientId: string, status: ClientStatus) => void;
  setChecklistTemplate: (template: ChecklistTemplate) => void;
  addMessageTemplate: (data: Omit<MessageTemplate, 'id'>) => void;
  updateMessageTemplate: (template: MessageTemplate) => void;
  deleteMessageTemplate: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  const persist = useCallback((updater: (prev: AppState) => AppState) => {
    setState(prev => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  const addClient = useCallback(
    (data: ClientInput): Client => {
      const id = generateId();
      const portalKey = generatePortalKey();
      const template = state.checklistTemplates.find(
        t => t.servicePlan === data.servicePlan
      );
      const checklist: ChecklistEntry[] = (template?.items || []).map(label => ({
        id: generateId(),
        label,
        checked: false,
      }));
      const client: Client = {
        ...data,
        id,
        portalKey,
        checklist,
        createdAt: new Date().toISOString().split('T')[0],
      };
      persist(prev => ({ ...prev, clients: [...prev.clients, client] }));
      return client;
    },
    [state.checklistTemplates, persist]
  );

  const updateClient = useCallback(
    (client: Client) => {
      persist(prev => ({
        ...prev,
        clients: prev.clients.map(c => (c.id === client.id ? client : c)),
      }));
    },
    [persist]
  );

  const deleteClient = useCallback(
    (id: string) => {
      persist(prev => ({
        ...prev,
        clients: prev.clients.filter(c => c.id !== id),
      }));
    },
    [persist]
  );

  const toggleChecklist = useCallback(
    (clientId: string, entryId: string) => {
      persist(prev => ({
        ...prev,
        clients: prev.clients.map(c =>
          c.id === clientId
            ? {
                ...c,
                checklist: c.checklist.map(e =>
                  e.id === entryId ? { ...e, checked: !e.checked } : e
                ),
              }
            : c
        ),
      }));
    },
    [persist]
  );

  const updateClientStatus = useCallback(
    (clientId: string, status: ClientStatus) => {
      persist(prev => ({
        ...prev,
        clients: prev.clients.map(c =>
          c.id === clientId ? { ...c, status } : c
        ),
      }));
    },
    [persist]
  );

  const setChecklistTemplate = useCallback(
    (template: ChecklistTemplate) => {
      persist(prev => {
        const exists = prev.checklistTemplates.some(
          t => t.servicePlan === template.servicePlan
        );
        return {
          ...prev,
          checklistTemplates: exists
            ? prev.checklistTemplates.map(t =>
                t.servicePlan === template.servicePlan ? template : t
              )
            : [...prev.checklistTemplates, template],
        };
      });
    },
    [persist]
  );

  const addMessageTemplate = useCallback(
    (data: Omit<MessageTemplate, 'id'>) => {
      const template: MessageTemplate = { ...data, id: generateId() };
      persist(prev => ({
        ...prev,
        messageTemplates: [...prev.messageTemplates, template],
      }));
    },
    [persist]
  );

  const updateMessageTemplate = useCallback(
    (template: MessageTemplate) => {
      persist(prev => ({
        ...prev,
        messageTemplates: prev.messageTemplates.map(t =>
          t.id === template.id ? template : t
        ),
      }));
    },
    [persist]
  );

  const deleteMessageTemplate = useCallback(
    (id: string) => {
      persist(prev => ({
        ...prev,
        messageTemplates: prev.messageTemplates.filter(t => t.id !== id),
      }));
    },
    [persist]
  );

  const value: StoreContextType = {
    state,
    addClient,
    updateClient,
    deleteClient,
    toggleChecklist,
    updateClientStatus,
    setChecklistTemplate,
    addMessageTemplate,
    updateMessageTemplate,
    deleteMessageTemplate,
  };

  return React.createElement(StoreContext.Provider, { value }, children);
}

export function useStore(): StoreContextType {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function fillTemplate(template: string, client: Client): string {
  const missingDocs = client.checklist
    .filter(c => !c.checked)
    .map(c => `• ${c.label}`)
    .join('\n');

  return template
    .replace(/\{ClientName\}/g, client.clientName)
    .replace(/\{Month\}/g, client.month)
    .replace(/\{DueDate\}/g, client.dueDate)
    .replace(/\{MissingDocs\}/g, missingDocs || 'Ninguno')
    .replace(/\{ServicePlan\}/g, client.servicePlan)
    .replace(/\{DriveFolder\}/g, client.driveFolderURL || '#')
    .replace(/\{PaymentLink\}/g, client.paymentLinkURL || '#')
    .replace(
      /\{PortalLink\}/g,
      `${window.location.origin}${window.location.pathname}#/portal/${client.portalKey}`
    );
}
