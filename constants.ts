import { ChecklistTemplate, MessageTemplate, FAQItem, ClientStatus, ServicePlan } from './types';

export const STATUS_LABELS: Record<ClientStatus, string> = {
  Onboarding: 'Onboarding',
  Active: 'Activo',
  MissingDocs: 'Docs Pendientes',
  ReadyToFile: 'Listo para Declarar',
  Filed: 'Declarado',
};

export const STATUS_COLORS: Record<ClientStatus, { bg: string; text: string; dot: string }> = {
  Onboarding: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  Active: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  MissingDocs: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  ReadyToFile: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  Filed: { bg: 'bg-teal-50', text: 'text-teal-700', dot: 'bg-teal-500' },
};

export const STATUS_KANBAN_COLORS: Record<ClientStatus, string> = {
  Onboarding: 'border-t-blue-500',
  Active: 'border-t-green-500',
  MissingDocs: 'border-t-amber-500',
  ReadyToFile: 'border-t-purple-500',
  Filed: 'border-t-teal-500',
};

export const STATUS_ORDER: ClientStatus[] = [
  'Onboarding',
  'Active',
  'MissingDocs',
  'ReadyToFile',
  'Filed',
];

export const SERVICE_PLANS: ServicePlan[] = ['IVA', 'Renta', 'Nómina', 'Full'];

export const DEFAULT_CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    servicePlan: 'IVA',
    items: [
      'Libro de compras recibido',
      'Libro de ventas recibido',
      'Facturas electrónicas verificadas',
      'Notas de crédito/débito revisadas',
      'Declaración F29 preparada',
      'Declaración enviada al SII',
    ],
  },
  {
    servicePlan: 'Renta',
    items: [
      'Certificados de retención recibidos',
      'Información de ingresos recopilada',
      'Gastos deducibles documentados',
      'Balance tributario preparado',
      'Formulario 22 preparado',
      'Declaración de renta enviada',
    ],
  },
  {
    servicePlan: 'Nómina',
    items: [
      'Datos de empleados actualizados',
      'Horas extras verificadas',
      'Licencias médicas procesadas',
      'Cálculo de remuneraciones',
      'Cotizaciones previsionales calculadas',
      'Liquidaciones de sueldo emitidas',
    ],
  },
  {
    servicePlan: 'Full',
    items: [
      'Libro de compras recibido',
      'Libro de ventas recibido',
      'Facturas electrónicas verificadas',
      'Declaración F29 preparada',
      'Datos de nómina actualizados',
      'Liquidaciones emitidas',
      'Certificados de retención recibidos',
      'Declaración de renta preparada',
      'Revisión general completada',
      'Todos los documentos archivados',
    ],
  },
];

export const DEFAULT_MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Recordatorio de documentos',
    body: 'Hola {ClientName}, te recordamos que para el período {Month} necesitamos los documentos pendientes antes del {DueDate}.\n\nDocumentos faltantes:\n{MissingDocs}\n\n¡Gracias!',
  },
  {
    id: 'tpl-2',
    name: 'Bienvenida nuevo cliente',
    body: 'Hola {ClientName}, ¡bienvenido/a a nuestro servicio contable!\n\nTu plan es: {ServicePlan}\n\nPuedes subir tus documentos aquí: {DriveFolder}\n\nAccede a tu portal: {PortalLink}\n\nCualquier duda, escríbenos.',
  },
  {
    id: 'tpl-3',
    name: 'Declaración lista',
    body: 'Hola {ClientName}, te informamos que tu declaración del período {Month} ya fue presentada exitosamente.\n\nPuedes revisar los detalles en tu portal: {PortalLink}',
  },
  {
    id: 'tpl-4',
    name: 'Recordatorio de pago',
    body: 'Hola {ClientName}, te recordamos que tienes un pago pendiente por el servicio contable del período {Month}.\n\nPuedes realizar tu pago aquí: {PaymentLink}\n\n¡Gracias!',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: '¿Cómo subo mis documentos?',
    answer: 'Haz clic en el botón "Subir Documentos" y se abrirá la carpeta de Google Drive donde puedes subir tus archivos organizados por mes.',
  },
  {
    question: '¿Cuáles son los plazos de declaración?',
    answer: 'Los plazos dependen del tipo de declaración. Tu contador te informará las fechas específicas. Puedes ver la fecha de vencimiento en la sección superior de esta página.',
  },
  {
    question: '¿Cómo realizo el pago?',
    answer: 'Haz clic en el botón "Realizar Pago" para acceder al enlace de pago seguro. Aceptamos transferencias y pagos en línea.',
  },
  {
    question: '¿Qué documentos necesito enviar?',
    answer: 'Revisa la lista de verificación en esta página. Los ítems marcados con ✓ son los que ya recibimos, los demás son los que necesitamos de tu parte.',
  },
  {
    question: '¿Cómo me comunico con mi contador?',
    answer: 'Puedes escribirnos por WhatsApp o correo electrónico. Los datos de contacto están al final de esta página.',
  },
];
