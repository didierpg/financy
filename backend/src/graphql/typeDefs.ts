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
  
  type Query {
    health: HealthCheck!
    me: User! 
    categories: [Category!]! 
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
    createCategory(name: String!, description: String, icon: String!, color: String!): Category!
    updateCategory(id: String!, name: String!, description: String, icon: String!, color: String!): Category!
    deleteCategory(id: String!): Boolean!
  }
`;
