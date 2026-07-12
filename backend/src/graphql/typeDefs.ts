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
  
  type Query {
    health: HealthCheck!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!
  }
`;