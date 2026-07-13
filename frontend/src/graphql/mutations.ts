import { gql } from "@/graphql/generated/gql";

export const REGISTER_MUTATION = gql(`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        email
        id
        name
      }
    }
  }
`);