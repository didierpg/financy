export interface CategoryMock {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: number;
  totalAmount: number;
}

export const MOCK_CATEGORIES: CategoryMock[] = [
  {
    id: "1",
    name: "Alimentação",
    description: "Restaurantes, delivery e refeições",
    icon: "utensils",
    color: "blue",
    transactionCount: 12,
    totalAmount: 54230, // R$ 542,30
  },
  {
    id: "2",
    name: "Entretenimento",
    description: "Cinema, jogos e lazer",
    icon: "ticket",
    color: "pink",
    transactionCount: 2,
    totalAmount: 18620,
  },
  {
    id: "3",
    name: "Investimento",
    description: "Aplicações e retornos financeiros",
    icon: "sparkles",
    color: "green",
    transactionCount: 1,
    totalAmount: 34025,
  },
  {
    id: "4",
    name: "Mercado",
    description: "Compras de supermercado e mantimentos",
    icon: "shoppingcart",
    color: "orange",
    transactionCount: 3,
    totalAmount: 29875,
  },
  {
    id: "5",
    name: "Salário",
    description: "Renda mensal e bonificações",
    icon: "briefcase",
    color: "green",
    transactionCount: 3,
    totalAmount: 425000,
  },
  {
    id: "6",
    name: "Saúde",
    description: "Medicamentos, consultas e exames",
    icon: "heart",
    color: "red",
    transactionCount: 0,
    totalAmount: 0,
  },
  {
    id: "7",
    name: "Transporte",
    description: "Gasolina, transporte público e viagens",
    icon: "car",
    color: "purple",
    transactionCount: 8,
    totalAmount: 38550,
  },
  {
    id: "8",
    name: "Utilidades",
    description: "Energia, água, internet e telefone",
    icon: "filetext",
    color: "yellow",
    transactionCount: 7,
    totalAmount: 24580,
  },
];
