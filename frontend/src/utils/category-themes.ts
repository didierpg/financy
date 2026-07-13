import {
  Briefcase,
  Car,
  Heart,
  PiggyBank,
  ShoppingCart,
  Ticket,
  Gift,
  Utensils,
  PawPrint,
  Home,
  Sparkles,
  Dumbbell,
  Book,
  GraduationCap,
  Map,
  FileText,
  LucideIcon
} from 'lucide-react';

// 1. Mapeamento de Cores: Associa a string salva no banco com as cores do seu CSS
export interface ColorTheme {
  value: string;
  dotClass: string;      // Bolinha de seleção
  bgClass: string;       // Fundo do quadrado do ícone (Pastel)
  textClass: string;     // Cor do ícone
  badgeClass: string;    // Fundo do badge de quantidade
  badgeTextClass: string; // Texto do badge
}

export const CATEGORY_COLORS: Record<string, ColorTheme> = {
  green: {
    value: 'green',
    dotClass: 'bg-green-base',
    bgClass: 'bg-green-light',
    textClass: 'text-green-dark',
    badgeClass: 'bg-green-light',
    badgeTextClass: 'text-green-dark',
  },
  blue: {
    value: 'blue',
    dotClass: 'bg-blue-base',
    bgClass: 'bg-blue-light',
    textClass: 'text-blue-dark',
    badgeClass: 'bg-blue-light',
    badgeTextClass: 'text-blue-dark',
  },
  purple: {
    value: 'purple',
    dotClass: 'bg-purple-base',
    bgClass: 'bg-purple-light',
    textClass: 'text-purple-dark',
    badgeClass: 'bg-purple-light',
    badgeTextClass: 'text-purple-dark',
  },
  pink: {
    value: 'pink',
    dotClass: 'bg-pink-base',
    bgClass: 'bg-pink-light',
    textClass: 'text-pink-dark',
    badgeClass: 'bg-pink-light',
    badgeTextClass: 'text-pink-dark',
  },
  red: {
    value: 'red',
    dotClass: 'bg-red-base',
    bgClass: 'bg-red-light',
    textClass: 'text-red-dark',
    badgeClass: 'bg-red-light',
    badgeTextClass: 'text-red-dark',
  },
  orange: {
    value: 'orange',
    dotClass: 'bg-orange-base',
    bgClass: 'bg-orange-light',
    textClass: 'text-orange-dark',
    badgeClass: 'bg-orange-light',
    badgeTextClass: 'text-orange-dark',
  },
  yellow: {
    value: 'yellow',
    dotClass: 'bg-yellow-base',
    bgClass: 'bg-yellow-light',
    textClass: 'text-yellow-dark',
    badgeClass: 'bg-yellow-light',
    badgeTextClass: 'text-yellow-dark',
  },
};

// 2. Mapeamento de Ícones: Associa a string do banco ao Componente React físico
export interface IconOption {
  name: string;
  icon: LucideIcon;
}

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  car: Car,
  heart: Heart,
  piggybank: PiggyBank,
  shoppingcart: ShoppingCart,
  ticket: Ticket,
  gift: Gift,
  utensils: Utensils,
  pawprint: PawPrint,
  home: Home,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  book: Book,
  graduationcap: GraduationCap,
  map: Map,
  filetext: FileText,
};

// Mapeador auxiliar seguro para fallback caso venha um ícone desconhecido do banco
export function getCategoryIcon(iconName: string): LucideIcon {
  return CATEGORY_ICONS[iconName.toLowerCase()] || FileText;
}

export function getCategoryColor(colorName: string): ColorTheme {
  return CATEGORY_COLORS[colorName.toLowerCase()] || CATEGORY_COLORS.green;
}