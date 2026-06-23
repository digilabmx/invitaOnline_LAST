import { InvitationExample, Benefit, PricingPackage, Testimonial, FAQItem } from './types';

export const HERO_IMAGE = '/hero_phone_mockup_1781992151448.jpg';

export const EXAMPLES: InvitationExample[] = [
  {
    id: 'ex-1',
    title: 'Elegancia Clásica (Sofía & Alejandro)',
    category: 'Bodas',
    image: '/wedding_portrait_1781994427687.jpg',
    demoUrl: '#templateboda',
    accentColor: '#b9976b',
    features: ['Música de Fondo', 'Confirmación por WhatsApp', 'Mesa de Regalos', 'Efecto de Hojas cayendo']
  },
  {
    id: 'ex-deep-gold',
    title: 'Gala Black & Gold (Andrea & Juan)',
    category: 'Bodas',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600&fm=webp',
    demoUrl: '#templateboda2',
    accentColor: '#d4af37',
    features: ['Sobre Wax-Seal Interactivo', 'Efecto Stardust de Oro', 'Mapeo Directo GPS', 'Cuenta Regresiva Circular']
  },
  {
    id: 'ex-monochrome-minimalist',
    title: 'Monochrome Minimalist (Andrés & Paulete)',
    category: 'Bodas',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600&fm=webp',
    demoUrl: '#templateboda4',
    accentColor: '#1a1a1a',
    features: ['Efecto de Hojas Orgánicas', 'Monograma de Alta Costura', 'Diseño Grayscale Minimalista', 'Itinerario de Íconos Hand-drawn']
  },
  {
    id: 'ex-2',
    title: 'Destellos de Rosa (Valentina)',
    category: 'XV Años',
    image: '/quince_card_1781992176864.jpg',
    demoUrl: '#demo-xv',
    accentColor: '#e0b3b3',
    features: ['Cuenta Regresiva', 'Código de Vestimenta', 'Galería de Fotos', 'Efecto Glitter']
  },
  {
    id: 'ex-3',
    title: 'Floralia Acuarela (Bautizo Mateo)',
    category: 'Bautizos',
    image: '/bautizo_card_1781992187887.jpg',
    demoUrl: '#demo-bautizo',
    accentColor: '#8da592',
    features: ['Ubicación GPS', 'Información de Padrinos', 'Espacio para Oración', 'Estilo Minimalista']
  },
  {
    id: 'ex-4',
    title: 'Noche de Gala (Santiago (40 años))',
    category: 'Cumpleaños',
    image: '/cumpleanos_card_1781992199358.jpg',
    demoUrl: '#demo-cumpleanos',
    accentColor: '#3a3028',
    features: ['Sugerencia de Hospedaje', 'Confirmación Instantánea', 'Playlist de Spotify', 'Diseño Dark Premium']
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'b-1',
    title: 'Entrega Rápida',
    description: 'En solo 3 días hábiles tu diseño estará listo y optimizado para compartir.',
    iconName: 'Clock'
  },
  {
    id: 'b-2',
    title: 'Diseño Personalizado',
    description: 'Ajustamos la tipografía, colores e imágenes para que combinen con la paleta de tu evento.',
    iconName: 'Sparkles'
  },
  {
    id: 'b-3',
    title: 'Compatible con WhatsApp',
    description: 'Se comparte a través de un link elegante que tus invitados abren instantáneamente sin instalar nada.',
    iconName: 'Share2'
  },
  {
    id: 'b-4',
    title: 'Confirmación de Asistencia',
    description: 'Los invitados confirman asistencia directo a tu WhatsApp con un mensaje pre-formateado automatizado.',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'b-5',
    title: 'Ubicación interactiva (GPS)',
    description: 'Integración amigable con un botón directo a Google Maps o Waze para que nadie se pierda.',
    iconName: 'MapPin'
  },
  {
    id: 'b-6',
    title: 'Cuenta Regresiva',
    description: 'Un elegante temporizador en tiempo real que crea expectativa para el día esperado.',
    iconName: 'Hourglass'
  },
  {
    id: 'b-7',
    title: 'Galería de Fotos',
    description: 'Espacio elegante para lucir una sesión de fotos profesional de la pareja o festejado.',
    iconName: 'Image'
  },
  {
    id: 'b-8',
    title: 'Música de Fondo',
    description: 'Acompaña la lectura de la invitación con tu canción favorita en reproducción suave integrada.',
    iconName: 'Music'
  }
];

export const PACKAGES: PricingPackage[] = [
  {
    id: 'p-1',
    name: 'Básico',
    price: '$199',
    description: 'Invitación digital elegante y hermosa con las características esenciales para tu evento.',
    features: [
      { text: 'Diseño de plantilla elegante (Boda/XV/Bautizo)', included: true },
      { text: 'Datos principales (Fecha, hora, lugar)', included: true },
      { text: 'Música de fondo', included: true },
      { text: 'Ubicación de GPS (Enlace interactivo)', included: true },
      { text: 'Cuenta regresiva en tiempo real', included: true },
      { text: 'Mesa de regalos', included: true },
      { text: 'Galería de 5 a 10 fotos', included: true },
      { text: 'Sugerencia de hospedaje', included: true },
      { text: 'Código de vestimenta estilizado', included: true },
      { text: 'Lluvia de pétalos / Efectos visuales', included: true },
      { text: 'Manejo de invitados y pases individuales', included: false }
    ],
    popular: false,
    buttonText: 'Empezar Básico',
    deliveryTime: 'Entrega en 3 días hábiles'
  },
  {
    id: 'p-2',
    name: 'Premium',
    price: '$499',
    description: 'La experiencia de lujo más completa con asistencia técnica y panel de control de invitados.',
    hasDiscount: true,
    originalPrice: '$699',
    features: [
      { text: 'Personalización de colores a tu paleta de evento', included: true },
      { text: 'Datos principales ilimitados', included: true },
      { text: 'Música de fondo integrada (Tu canción)', included: true },
      { text: 'Ubicaciones GPS para Ceremonia y Recepción', included: true },
      { text: 'Cuenta regresiva en tiempo real', included: true },
      { text: 'Mesa de regalos, datos bancarios / depósitos', included: true },
      { text: 'Galería de 5 a 10 fotos', included: true },
      { text: 'Sugerencia de hospedaje', included: true },
      { text: 'Código de vestimenta estilizado', included: true },
      { text: 'Lluvia de pétalos / Efectos visuales', included: true },
      { text: 'Acceso a un panel para manejo de invitación y confirmaciones', included: true },
      { text: 'Asistencia técnica personalizada', included: true }
    ],
    popular: true,
    buttonText: 'Solicitar Premium',
    deliveryTime: 'Entrega prioritaria (2 días hábiles)'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Mariana & Carlos',
    role: 'Boda en Hacienda',
    text: '“La invitación fue un éxito absoluto. A todos nuestros invitados les encantó la música de fondo y la facilidad de confirmar asistencia con un solo click. InvitaOnline nos ahorró miles de pesos en papelería y envíos.”',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=70&fm=webp',
    date: 'Hace 1 mes'
  },
  {
    id: 't-2',
    name: 'Gabriela Treviño',
    role: 'Mamá de Sofía (XV Años)',
    text: '“El diseño de puras flores acuareladas con destellos rosas quedó precioso. Modificaron los colores para que coincidieran exactamente con el vestido de mi hija y nos entregaron en solo dos días. Altamente profesionales.”',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces&q=70&fm=webp',
    date: 'Hace 3 semanas'
  },
  {
    id: 't-3',
    name: 'Rodrigo & Sofía',
    role: 'Boda Destino Tulum',
    text: '“Viviendo fuera de México, mandar invitaciones físicas era imposible. Con InvitaOnline enviamos por WhatsApp un link hermoso. El mapa interactivo ayudó a que todos llegaran sin contratiempos al hotel de playa.”',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=70&fm=webp',
    date: 'Hace 2 meses'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f-1',
    question: '¿Cómo envian la invitación y cómo la comparto?',
    answer: 'Te entregamos un enlace web único y elegante (ej. invitaonline.mx/sofia-y-ale). Este enlace lo puedes enviar directamente por WhatsApp, Messenger, correo electrónico o publicarlo en tus redes sociales. Es completamente interactivo y responsivo.'
  },
  {
    id: 'f-2',
    question: '¿Cómo funciona la confirmación de asistencia?',
    answer: 'La invitación incluye un botón sofisticado de "Confirmar Asistencia". Cuando tu invitado hace clic, la invitación le pregunta cuántos boletos asistirán y genera un mensaje automatizado que se envía directo a tu WhatsApp con todos los datos ordenados en un segundo.'
  },
  {
    id: 'f-3',
    question: '¿Puedo cambiar la música, las fotos y el orden de los elementos?',
    answer: '¡Por supuesto! En ambos paquetes puedes mandarnos tu canción de preferencia (o un link de YouTube/Spotify) y nosotros la integramos. También colocamos tus fotos de sesión y podemos adaptar los textos en el orden que prefieras.'
  },
  {
    id: 'f-4',
    question: '¿Qué formas de pago aceptan y en cuánto tiempo está lista?',
    answer: 'Aceptamos transferencias bancarias Tardamos 3 días hábiles en el paquete Básico y 2 días hábiles en el paquete Premium posterior al envío de tus datos.'
  },
  {
    id: 'f-5',
    question: '¿La invitación tiene vigencia o límite de visitas?',
    answer: 'No, tu invitación estará en línea y disponible sin límite de visitas desde el momento de la entrega hasta 30 días posteriores al día de tu evento.'
  },
  {
    id: 'f-6',
    question: '¿Puedo hacer cambios después de que sea entregada?',
    answer: 'Sí. El paquete Premium incluye un período de 15 días posteriores a la entrega para hacer ajustes menores gratis (como correcciones ortográficas, cambio de horario o actualizaciones de mesa de regalos).'
  }
];
