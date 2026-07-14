import { gql } from "@/graphql/generated/gql";

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      name
      email
    }
  }
`);

export const DASHBOARD_STATS_QUERY = gql(`
  query DashboardStats($month: Int!, $year: Int!) {
    dashboardStats(month: $month, year: $year) {
      totalBalance
      monthlyIncome
      monthlyExpense
    }
  }
`);

export const RECENT_TRANSACTIONS_QUERY = gql(`
  query RecentTransactions {
  transactions(limit: 5) {
    items {
      id
      description
      amount
      type
      date
      category {
        name
        color
        icon
      }
    }
  }
}
`);

export const PAGINATED_TRANSACTIONS_QUERY = gql(`
  query PaginatedTransactions(
    $page: Int
    $limit: Int
    $search: String
    $type: TransactionType
    $categoryId: String
    $month: Int
    $year: Int
  ) {
    transactions(
      page: $page
      limit: $limit
      search: $search
      type: $type
      categoryId: $categoryId
      month: $month
      year: $year
    ) {
      totalCount
      items {
        id
        description
        amount
        type
        date
        categoryId
        category {
          id
          name
          color
          icon
        }
      }
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
