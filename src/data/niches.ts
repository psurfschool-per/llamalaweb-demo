export type Niche = {
  slug: string;
  label: string;
  serviceType: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  tile: string;
  includes: { icon: "layout" | "cart" | "search" | "shield"; title: string; text: string }[];
  benefits: string[];
  projects: string[];
  faqs: { q: string; a: string }[];
};

export const niches: Niche[] = [
  {
    slug: "web-para-restaurantes",
    label: "Restaurantes y cafés",
    serviceType: "Diseño de páginas web para restaurantes y cafeterías",
    title: "Página web para restaurantes y cafés en Perú | llamalaweb",
    description:
      "Menú digital con fotos, reservas por WhatsApp, horarios y Google Maps: la web que llena mesas y evita que te encuentren solo por delivery.",
    h1: "Una web para tu restaurante que llena mesas, no solo curiosos.",
    intro:
      "Tu comida entra por los ojos: menú digital siempre actualizado, fotos que antojan, reserva o pedido a un toque y tu ubicación en Google Maps. Deja de depender solo de las apps de delivery y quédate con el cliente directo.",
    tile: "bg-pink",
    includes: [
      { icon: "layout", title: "Menú digital con fotos", text: "Categorías, precios y platos destacados, fácil de actualizar sin reimprimir nada." },
      { icon: "cart", title: "Pedidos y reservas", text: "Botones de pedido por WhatsApp o enlace a tu delivery, y reserva de mesas sin llamadas." },
      { icon: "search", title: "Google Maps y horarios", text: "Que te encuentren buscando \"restaurante cerca de mí\" con dirección, horario y reseñas." },
      { icon: "shield", title: "Reseñas y confianza", text: "Tus mejores comentarios de Google visibles para convencer al que duda." },
      { icon: "layout", title: "Cartas por sede u hora", text: "Desayunos, almuerzos, carta de noche o por local: cada una en su sección." },
      { icon: "search", title: "SEO local del rubro", text: "Textos y títulos pensados para búsquedas de tu zona y tipo de comida." },
    ],
    benefits: [
      "El cliente ve el menú y el precio antes de llegar: llegan decididos y piden más rápido.",
      "Reservas y pedidos por WhatsApp con mensaje prellenado, sin llamadas perdidas.",
      "Apareces en Google Maps y en búsquedas de tu zona, no solo dentro de las apps de delivery.",
      "Actualizas precios y platos tú mismo o con tu plan de mantenimiento, sin reimprimir cartas.",
    ],
    projects: [],
    faqs: [
      { q: "¿Puedo actualizar el menú yo mismo?", a: "Sí. Dejamos el menú en secciones simples de editar y te capacitamos; o lo actualizamos nosotros dentro de tu plan de mantenimiento." },
      { q: "¿Sirve si ya estoy en apps de delivery?", a: "Sí: la web capta al cliente directo (sin comisión) y refuerza tu marca, mientras las apps siguen siendo un canal más." },
      { q: "¿Incluye fotos de los platos?", a: "Si aún no tienes fotografía, usamos imágenes de stock de tu tipo de cocina mientras consigues fotos reales; te guiamos para tomarlas bien." },
    ],
  },
  {
    slug: "web-para-tiendas-online",
    label: "Tiendas online",
    serviceType: "Diseño de tiendas online y e-commerce",
    title: "Tienda online para tu negocio en Perú | llamalaweb",
    description:
      "Catálogo con carrito, pagos por Yape, Plin o transferencia, control de stock y WhatsApp: vende las 24 horas sin comisiones de marketplace.",
    h1: "Tu tienda online propia, vendiendo las 24 horas sin comisiones.",
    intro:
      "Un catálogo ordenado con fotos, tallas o variantes, carrito de compras y pago coordinado por Yape, Plin o transferencia. Tus clientes compran a cualquier hora y tú mantienes el control de tu marca y tus márgenes.",
    tile: "bg-sky",
    includes: [
      { icon: "cart", title: "Catálogo y carrito", text: "Productos con fotos, variantes (talla, color), stock y carrito de compras claro." },
      { icon: "cart", title: "Pagos a tu medida", text: "Yape, Plin, transferencia o pasarela tarjeta según tu operación actual." },
      { icon: "layout", title: "Fichas que venden", text: "Descripciones orientadas a beneficio, fotos y llamadas a comprar sin fricción." },
      { icon: "search", title: "Buscador y filtros", text: "Por categoría, precio o novedad: el cliente encuentra rápido y compra más." },
      { icon: "shield", title: "Confianza visible", text: "Políticas de envío y cambios, medios de pago y contacto claro para comprar tranquilo." },
      { icon: "search", title: "SEO de producto", text: "Cada producto indexable en Google con su propio título y descripción." },
    ],
    benefits: [
      "Vendes fuera del horario de tu tienda física, sin pagar comisión por venta a marketplaces.",
      "El carrito con WhatsApp recupera pedidos dudosos: el cliente consulta y cierra en el chat.",
      "Tus datos de clientes y ventas son tuyos, no de una plataforma externa.",
      "Puedes lanzar promociones y colecciones sin depender de terceros.",
    ],
    projects: ["camden-peru"],
    faqs: [
      { q: "¿Necesito una pasarela de tarjetas desde el inicio?", a: "No. Muchas tiendas arrancan con Yape/Plin/transferencia coordinadas por WhatsApp y suman tarjeta cuando el volumen lo justifica." },
      { q: "¿Cuántos productos puedo tener?", a: "Depende del plan: una landing-catálogo maneja decenas de productos; una tienda Premium escala a cientos con filtros y stock." },
      { q: "¿Quién carga los productos?", a: "Te dejamos la tienda con una carga inicial incluida y te capacitamos para el resto; también lo hacemos por ti dentro del mantenimiento." },
    ],
  },
  {
    slug: "web-para-inmobiliarias",
    label: "Inmobiliarias",
    serviceType: "Diseño de páginas web para inmobiliarias",
    title: "Página web para inmobiliarias en Perú | llamalaweb",
    description:
      "Catálogo de propiedades con filtros por venta y alquiler, fichas con fotos y ubicación, y valoración gratuita que llega directo a tu WhatsApp.",
    h1: "Tu cartera de propiedades online, filtrando curiosos y atrayendo clientes serios.",
    intro:
      "Un catálogo con filtros por operación (venta/alquiler), tipo de inmueble y zona, fichas con fotos, áreas y ubicación, y un formulario de valoración gratuita que te llega armado por WhatsApp. Menos llamadas perdidas, más visitas calificadas.",
    tile: "bg-peri",
    includes: [
      { icon: "layout", title: "Catálogo con filtros", text: "Venta, alquiler, depas, casas, terrenos o locales: cada búsqueda encuentra su lista." },
      { icon: "search", title: "Fichas completas", text: "Fotos, m², dormitorios, ubicación y estado, con botón Consultar por propiedad." },
      { icon: "search", title: "Captación de propietarios", text: "Formulario de valoración gratuita que arma el mensaje con los datos del inmueble." },
      { icon: "shield", title: "Marca y respaldo", text: "Tu trayectoria, equipo y proceso de acompañamiento legal visibles para generar confianza." },
      { icon: "layout", title: "Destacados y novedades", text: "Resalta propiedades estrella y mantén el catálogo vivo sin rehacer la web." },
      { icon: "search", title: "SEO por zona", text: "Posiciona por búsquedas como \"casa en venta en [distrito]\" con páginas y textos claros." },
    ],
    benefits: [
      "Filtras curiosos: quien consulta ya vio fotos, área y precio referencial.",
      "Cada propiedad tiene su propio enlace para compartir por WhatsApp o redes.",
      "La valoración gratuita te trae propietarios, no solo compradores.",
      "Tu catálogo trabaja de noche y fines de semana, cuando el cliente busca.",
    ],
    projects: ["bh-inmobiliaria"],
    faqs: [
      { q: "¿Puedo publicar y bajar propiedades yo mismo?", a: "Sí: el catálogo se maneja por secciones simples o con tu plan de mantenimiento lo actualizamos nosotros el mismo día." },
      { q: "¿Se puede conectar con un CRM o portal?", a: "En el plan Premium integramos formularios y catálogos con tus herramientas actuales; cuéntanos cuál usas y lo evaluamos." },
      { q: "¿Sirve si trabajo solo/a?", a: "Sí: una web clara con tu foto, proceso y catálogo te hace ver establecido y filtra clientes antes de la primera llamada." },
    ],
  },
  {
    slug: "web-para-escuelas-deportivas",
    label: "Escuelas y deportes",
    serviceType: "Diseño de páginas web para escuelas deportivas y academias",
    title: "Página web para escuelas deportivas en Perú | llamalaweb",
    description:
      "Clases por nivel con horarios, reservas online, galería y reseñas: la web que convierte interesados en alumnos, dentro y fuera de temporada.",
    h1: "Una web para tu escuela que convierte interesados en alumnos.",
    intro:
      "Clases por nivel con precios y horarios, reserva online que termina en WhatsApp, galería de entrenamientos y reseñas de alumnos o apoderados. Tu escuela se ve profesional y llena cupos todo el año, no solo en verano.",
    tile: "bg-grape-soft",
    includes: [
      { icon: "layout", title: "Clases por nivel", text: "Principiantes, intermedio, competencia o niños: cada programa con su precio y horario." },
      { icon: "cart", title: "Reservas online", text: "Elige clase, fecha y datos en pasos simples; confirma por WhatsApp con pago Yape/Plin." },
      { icon: "search", title: "Ubicación y condiciones", text: "Mapa de la playa, campo o local, más pronóstico o estado del día si aplica." },
      { icon: "shield", title: "Reseñas y seguridad", text: "Instructores certificados, grupos reducidos y opiniones reales que tranquilizan al apoderado." },
      { icon: "layout", title: "Galería que enamora", text: "Fotos y videos de clases y logros: la mejor prueba de lo que se vive ahí." },
      { icon: "search", title: "Membresías y packs", text: "Planes mensuales o paquetes de clases presentados para subir el ticket promedio." },
    ],
    benefits: [
      "Reservas sin llamadas: el alumno elige horario y tú solo confirmas por WhatsApp.",
      "Los apoderados ven seguridad, instructores y reseñas antes de escribir.",
      "Llenas cupos en temporada baja con packs y membresías visibles.",
      "Tu historia y logros deportivos se convierten en tu mejor argumento de venta.",
    ],
    projects: ["pacific-surf-school", "huarco-surf"],
    faqs: [
      { q: "¿Puedo cobrar reservas online?", a: "Sí: coordenamos pago por Yape/Plin al confirmar o integramos pasarela de tarjetas en el plan Premium, según tu operación." },
      { q: "¿Maneja horarios y cupos por clase?", a: "En el plan Premium sí: disponibilidad por horario y límite de alumnos por instructor, con confirmación automática por WhatsApp." },
      { q: "¿Sirve para torneos o campeonatos?", a: "Sí: podemos publicar calendarios, resultados y galerías de competencias como secciones del sitio." },
    ],
  },
];

export const getNiche = (slug: string) => niches.find((niche) => niche.slug === slug);
