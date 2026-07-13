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

export const CREATE_CATEGORY_MUTATION = gql(`
  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {
    createCategory(name: $name, icon: $icon, color: $color, description: $description) {
      id
      name
      description
      icon
      color
      transactionCount
      totalAmount
    }
  }
`);

export const UPDATE_CATEGORY_MUTATION = gql(`
  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {
    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {
      id
      name
      description
      icon
      color
      transactionCount
      totalAmount
    }
  }
`);

export const DELETE_CATEGORY_MUTATION = gql(`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId)
  }
`);
