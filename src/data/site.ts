export const site = {
  name: "llamalaweb",
  domain: "llamalaweb.com",
  url: "https://llamalaweb.com",
  email: "hola@llamalaweb.com",
  tagline: "Webs que hacen crecer negocios.",
  description:
    "Diseño y desarrollo de sitios web para negocios que quieren crecer: planes desde $135 y hosting con seguimiento desde $20/mes. Sin permanencia.",
};

export const pen = (value: number) => `S/ ${value.toLocaleString("en-US")}`;
export const usd = (value: number) => `$${value.toLocaleString("en-US")}`;

export type Plan = {
  name: string;
  price: number | null;
  tagline: string;
  delivery: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const webPlans: Plan[] = [
  {
    name: "Landing Express",
    price: 135,
    tagline: "Tu página web profesional para mostrar tu negocio y atraer clientes.",
    delivery: "Entrega en 5–7 días",
    features: [
      "Página única optimizada",
      "Diseño a medida + guía de textos",
      "SEO básico y Google Maps",
      "Formularios, WhatsApp y analítica",
      "Totalmente responsive",
      "2 rondas de cambios incluidas",
    ],
    highlighted: true,
    badge: "Más elegido",
  },
  {
    name: "Premium",
    price: null,
    tagline: "Para vender online, agendar citas o integrar tu web con tus herramientas.",
    delivery: "Entrega en 3–4 semanas",
    features: [
      "Hasta 10 páginas o tienda online",
      "Pagos, reservas o integraciones a medida",
      "Redacción de textos orientada a venta",
      "SEO técnico + velocidad optimizada",
      "Capacitación para administrar tu web",
      "30 días de soporte post-lanzamiento",
    ],
  },
];

export type MaintenancePlan = {
  name: string;
  price: number;
  summary: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "Esencial",
    price: 20,
    summary: "Para que tu web siga online, segura y sin errores.",
    features: [
      "Hosting, dominio conectado y SSL",
      "Actualizaciones y backups mensuales",
      "Monitoreo de disponibilidad",
      "Seguimiento activo de la web",
      "1 cambio pequeño al mes",
      "Soporte por email (48 h hábiles)",
    ],
  },
  {
    name: "Cuidado",
    price: 39,
    summary: "El equilibrio perfecto entre tranquilidad y mejoras continuas.",
    features: [
      "Todo lo del plan Esencial",
      "3 cambios al mes + 1 hora de diseño",
      "Informe mensual de visitas y rendimiento",
      "SEO on-page y revisión de enlaces",
      "Soporte prioritario (24 hr hábiles)",
    ],
    highlighted: true,
    badge: "Recomendado",
  },
  {
    name: "Total",
    price: 69,
    summary: "Un equipo digital a tu disposición para seguir creciendo.",
    features: [
      "Todo lo del plan Cuidado",
      "Cambios ilimitados razonables",
      "4 horas de desarrollo al mes",
      "Landing pages para campañas",
      "Soporte por WhatsApp (mismo día)",
    ],
  },
];

export const faqs = [
  {
    q: "¿Cuánto tarda mi web?",
    a: "Una landing suele estar lista en 5–7 días y una web completa en 10–14 días desde que recibimos tus textos, fotos y logo. Los proyectos Premium o con tienda online toman entre 3 y 4 semanas. Te damos una fecha concreta antes de empezar.",
  },
  {
    q: "¿Qué necesito para comenzar?",
    a: "Idealmente tu logo, textos e imágenes. Si no los tienes, no es un problema: te guiamos con los textos y usamos fotografía de stock incluida en el plan. También podemos partir solo con una conversación de 15 minutos.",
  },
  {
    q: "¿El dominio y el hosting están incluidos?",
    a: "La publicación y configuración del dominio están incluidas en todos los planes. El dominio se paga aparte (aproximadamente USD 12 al año) y queda a tu nombre. El hosting y el certificado SSL están cubiertos por el plan de mantenimiento.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Cada plan incluye rondas de cambios y no avanzamos a desarrollo sin tu aprobación del diseño. Si algo no te representa, lo ajustamos antes de publicar.",
  },
  {
    q: "¿Puedo cancelar el mantenimiento cuando quiera?",
    a: "Sí, sin contratos de permanencia. Tu web, tu dominio y tus contenidos son tuyos: si cancelas, te entregamos todos los accesos y backups para que la administres por tu cuenta.",
  },
  {
    q: "¿Trabajan con negocios de otros países?",
    a: "Sí. Trabajamos 100% en remoto con clientes de habla hispana. Coordinamos reuniones y entregas por videollamada, email o WhatsApp.",
  },
  {
    q: "¿Ya tengo una web, pueden mejorarla?",
    a: "Claro. Hacemos rediseños, optimización de velocidad, SEO y mantenimiento de sitios existentes. Escríbenos con la URL y te enviamos una evaluación sin costo.",
  },
];
