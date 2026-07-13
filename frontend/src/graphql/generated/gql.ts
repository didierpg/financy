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
    "\n  mutation CreateTransaction(\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    createTransaction(\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n": typeof types.CreateTransactionDocument,
    "\n  mutation UpdateTransaction(\n    $id: String!\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    updateTransaction(\n      id: $id\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n": typeof types.UpdateTransactionDocument,
    "\n  mutation DeleteTransaction($id: String!) {\n    deleteTransaction(id: $id)\n  }\n": typeof types.DeleteTransactionDocument,
    "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n": typeof types.DashboardStatsDocument,
    "\n  query RecentTransactions {\n  transactions(limit: 5) {\n    items {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        name\n        color\n        icon\n      }\n    }\n  }\n}\n": typeof types.RecentTransactionsDocument,
    "\n  query PaginatedTransactions(\n    $page: Int\n    $limit: Int\n    $search: String\n    $type: TransactionType\n    $categoryId: String\n    $month: Int\n    $year: Int\n  ) {\n    transactions(\n      page: $page\n      limit: $limit\n      search: $search\n      type: $type\n      categoryId: $categoryId\n      month: $month\n      year: $year\n    ) {\n      totalCount\n      items {\n        id\n        description\n        amount\n        type\n        date\n        categoryId\n        category {\n          id\n          name\n          color\n          icon\n        }\n      }\n    }\n  }\n": typeof types.PaginatedTransactionsDocument,
    "\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": typeof types.CategoriesDocument,
};
const documents: Documents = {
    "\n  mutation Register($name: String!, $email: String!, $password: String!) {\n    register(name: $name, email: $email, password: $password) {\n      token\n      user {\n        email\n        id\n        name\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateCategory($name: String!, $icon: String!, $color: String!, $description: String) {\n    createCategory(name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation UpdateCategory($updateCategoryId: String!, $name: String!, $icon: String!, $color: String!, $description: String) {\n    updateCategory(id: $updateCategoryId, name: $name, icon: $icon, color: $color, description: $description) {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($deleteCategoryId: String!) {\n    deleteCategory(id: $deleteCategoryId)\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation CreateTransaction(\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    createTransaction(\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n": types.CreateTransactionDocument,
    "\n  mutation UpdateTransaction(\n    $id: String!\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    updateTransaction(\n      id: $id\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n": types.UpdateTransactionDocument,
    "\n  mutation DeleteTransaction($id: String!) {\n    deleteTransaction(id: $id)\n  }\n": types.DeleteTransactionDocument,
    "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n": types.DashboardStatsDocument,
    "\n  query RecentTransactions {\n  transactions(limit: 5) {\n    items {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        name\n        color\n        icon\n      }\n    }\n  }\n}\n": types.RecentTransactionsDocument,
    "\n  query PaginatedTransactions(\n    $page: Int\n    $limit: Int\n    $search: String\n    $type: TransactionType\n    $categoryId: String\n    $month: Int\n    $year: Int\n  ) {\n    transactions(\n      page: $page\n      limit: $limit\n      search: $search\n      type: $type\n      categoryId: $categoryId\n      month: $month\n      year: $year\n    ) {\n      totalCount\n      items {\n        id\n        description\n        amount\n        type\n        date\n        categoryId\n        category {\n          id\n          name\n          color\n          icon\n        }\n      }\n    }\n  }\n": types.PaginatedTransactionsDocument,
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
export function gql(source: "\n  mutation CreateTransaction(\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    createTransaction(\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTransaction(\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    createTransaction(\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTransaction(\n    $id: String!\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    updateTransaction(\n      id: $id\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTransaction(\n    $id: String!\n    $description: String!\n    $amount: Int!\n    $type: TransactionType!\n    $date: String!\n    $categoryId: String!\n  ) {\n    updateTransaction(\n      id: $id\n      description: $description\n      amount: $amount\n      type: $type\n      date: $date\n      categoryId: $categoryId\n    ) {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        id\n        name\n        color\n        icon\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTransaction($id: String!) {\n    deleteTransaction(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTransaction($id: String!) {\n    deleteTransaction(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n"): (typeof documents)["\n  query DashboardStats($month: Int!, $year: Int!) {\n    dashboardStats(month: $month, year: $year) {\n      totalBalance\n      monthlyIncome\n      monthlyExpense\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query RecentTransactions {\n  transactions(limit: 5) {\n    items {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        name\n        color\n        icon\n      }\n    }\n  }\n}\n"): (typeof documents)["\n  query RecentTransactions {\n  transactions(limit: 5) {\n    items {\n      id\n      description\n      amount\n      type\n      date\n      category {\n        name\n        color\n        icon\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PaginatedTransactions(\n    $page: Int\n    $limit: Int\n    $search: String\n    $type: TransactionType\n    $categoryId: String\n    $month: Int\n    $year: Int\n  ) {\n    transactions(\n      page: $page\n      limit: $limit\n      search: $search\n      type: $type\n      categoryId: $categoryId\n      month: $month\n      year: $year\n    ) {\n      totalCount\n      items {\n        id\n        description\n        amount\n        type\n        date\n        categoryId\n        category {\n          id\n          name\n          color\n          icon\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PaginatedTransactions(\n    $page: Int\n    $limit: Int\n    $search: String\n    $type: TransactionType\n    $categoryId: String\n    $month: Int\n    $year: Int\n  ) {\n    transactions(\n      page: $page\n      limit: $limit\n      search: $search\n      type: $type\n      categoryId: $categoryId\n      month: $month\n      year: $year\n    ) {\n      totalCount\n      items {\n        id\n        description\n        amount\n        type\n        date\n        categoryId\n        category {\n          id\n          name\n          color\n          icon\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      id\n      name\n      description\n      icon\n      color\n      transactionCount\n      totalAmount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;