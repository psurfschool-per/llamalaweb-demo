export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  minutes: number;
  tags: string[];
  tile: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cuanto-cuesta-una-pagina-web-en-peru",
    title: "¿Cuánto cuesta una página web en Perú en 2026?",
    description:
      "Rangos reales de precios para landings, webs corporativas y tiendas online en Perú, qué hace subir o bajar el costo y qué gastos siguen después del lanzamiento.",
    date: "2026-11-23",
    dateLabel: "23 de noviembre de 2026",
    minutes: 7,
    tags: ["Precios", "Presupuesto"],
    tile: "bg-sky",
  },
  {
    slug: "que-necesita-mi-negocio-para-tener-una-web",
    title: "Qué necesita tu negocio para tener una web que venda (checklist)",
    description:
      "Dominio, contenidos, SEO local, WhatsApp, velocidad y mantenimiento: la lista completa de lo que una web necesita para convertir visitas en clientes.",
    date: "2026-11-16",
    dateLabel: "16 de noviembre de 2026",
    minutes: 6,
    tags: ["Guía", "Checklist"],
    tile: "bg-pink",
  },
  {
    slug: "como-vender-por-whatsapp-con-tu-web",
    title: "Cómo convertir tu WhatsApp en un canal de ventas con tu web",
    description:
      "Botones con mensaje prellenado, formularios que abren el chat, catálogos y reservas: 5 formas de integrar WhatsApp en tu sitio, con ejemplos reales.",
    date: "2026-11-09",
    dateLabel: "9 de noviembre de 2026",
    minutes: 6,
    tags: ["WhatsApp", "Ventas"],
    tile: "bg-peri",
  },
];

export const getPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
