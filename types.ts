export type ServicePlan = 'IVA' | 'Renta' | 'Nómina' | 'Full';

export type ClientStatus = 'Onboarding' | 'Active' | 'MissingDocs' | 'ReadyToFile' | 'Filed';

export interface ChecklistEntry {
  id: string;
  label: string;
  checked: boolean;
}

export interface Client {
  id: string;
  clientName: string;
  rut: string;
  contactName: string;
  whatsApp: string;
  email: string;
  servicePlan: ServicePlan;
  status: ClientStatus;
  month: string;
  dueDate: string;
  nextAction: string;
  notes: string;
  driveFolderURL: string;
  paymentLinkURL: string;
  portalKey: string;
  checklist: ChecklistEntry[];
  createdAt: string;
}

export interface ChecklistTemplate {
  servicePlan: ServicePlan;
  items: string[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  body: string;
}

export interface AppState {
  clients: Client[];
  checklistTemplates: ChecklistTemplate[];
  messageTemplates: MessageTemplate[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
