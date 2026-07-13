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
