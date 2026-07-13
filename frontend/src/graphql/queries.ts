import { gql } from "@/graphql/generated/gql";

export const DASHBOARD_STATS_QUERY = gql(`
  query DashboardStats($month: Int!, $year: Int!) {
    dashboardStats(month: $month, year: $year) {
      totalBalance
      monthlyIncome
      monthlyExpense
    }
  }
`);

export const CATEGORIES_QUERY = gql(`
  query Categories {
    categories {
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
