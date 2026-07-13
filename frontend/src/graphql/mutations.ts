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

export const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`);
