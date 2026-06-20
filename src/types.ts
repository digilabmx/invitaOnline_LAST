export interface InvitationExample {
  id: string;
  title: string;
  category: 'Bodas' | 'XV Años' | 'Bautizos' | 'Cumpleaños';
  image: string;
  demoUrl: string;
  accentColor: string;
  features: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  hasDiscount?: boolean;
  originalPrice?: string;
  description: string;
  features: { text: string; included: boolean }[];
  popular: boolean;
  buttonText: string;
  deliveryTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Boda de Sofía & Ale"
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
