export const typeDefs = `#graphql
  type HealthCheck {
    status: String!
    database: String!
  }
  
  type User {
    id: String!
    name: String!
    email: String!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Category {
    id: String!
    name: String!
    description: String
    icon: String!
    color: String!
    transactionCount: Int!
    totalAmount: Int!
  }

  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Transaction {
    id: String!
    description: String!
    amount: Int!
    type: TransactionType! 
    date: String!
    categoryId: String!
    category: Category!
  }

  type TransactionResponse {
    items: [Transaction!]!
    totalCount: Int!
  }

  type DashboardStats {
    totalBalance: Int!
    monthlyIncome: Int!
    monthlyExpense: Int!
  }
  
  type Query {
    health: HealthCheck!
    me: User! 
    categories: [Category!]! 
    transactions(search: String, type: TransactionType, categoryId: String, month: Int, year: Int, page: Int, limit: Int): TransactionResponse!
    dashboardStats(month: Int!, year: Int!): DashboardStats!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse!
    updateMe(name: String!): User!
    login(email: String!, password: String!): AuthResponse!
    createCategory(name: String!, description: String, icon: String!, color: String!): Category!
    updateCategory(id: String!, name: String!, description: String, icon: String!, color: String!): Category!
    deleteCategory(id: String!): Boolean!
    createTransaction(description: String!, amount: Int!, type: TransactionType!, date: String!, categoryId: String!): Transaction!
    updateTransaction(id: String!, description: String!, amount: Int!, type: TransactionType!, date: String!, categoryId: String!): Transaction!
    deleteTransaction(id: String!): Boolean!
  }
`;
