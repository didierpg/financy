/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Register($name: String!, $email: String!, $password: String!) {\n    register(name: $name, email: $email, password: $password) {\n      token\n      user {\n        email\n        id\n        name\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {\n    createCategory(name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": typeof types.CreateCategoryDocument,
    "\n  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {\n    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": typeof types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($deleteCategoryId: String!) {\n    deleteCategory(id: $deleteCategoryId)\n  }\n": typeof types.DeleteCategoryDocument,
    "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n": typeof types.DashboardStatsDocument,
    "\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": typeof types.CategoriesDocument,
};
const documents: Documents = {
    "\n  mutation Register($name: String!, $email: String!, $password: String!) {\n    register(name: $name, email: $email, password: $password) {\n      token\n      user {\n        email\n        id\n        name\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {\n    createCategory(name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {\n    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($deleteCategoryId: String!) {\n    deleteCategory(id: $deleteCategoryId)\n  }\n": types.DeleteCategoryDocument,
    "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n": types.DashboardStatsDocument,
    "\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": types.CategoriesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($name: String!, $email: String!, $password: String!) {\n    register(name: $name, email: $email, password: $password) {\n      token\n      user {\n        email\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($name: String!, $email: String!, $password: String!) {\n    register(name: $name, email: $email, password: $password) {\n      token\n      user {\n        email\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {\n    createCategory(name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {\n    createCategory(name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {\n    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {\n    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCategory($deleteCategoryId: String!) {\n    deleteCategory(id: $deleteCategoryId)\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($deleteCategoryId: String!) {\n    deleteCategory(id: $deleteCategoryId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n"): (typeof documents)["\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;