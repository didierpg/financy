import { useQuery } from "@apollo/client/react";
import { DASHBOARD_STATS_QUERY } from "@/graphql/queries";
import { formatCurrency } from "@/utils/format";
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export function Dashboard() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, loading, error } = useQuery(DASHBOARD_STATS_QUERY, {
    variables: {
      month: currentMonth,
      year: currentYear,
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm font-medium text-gray-500 animate-pulse">
          Carregando dados financeiros...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-danger text-sm">
        Não foi possível carregar as informações do dashboard. Erro:{" "}
        {error.message}
      </div>
    );
  }

  const stats = data?.dashboardStats ?? {
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Saldo Total
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1">
            {formatCurrency(stats.totalBalance)}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Receitas do Mês
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1">
            {formatCurrency(stats.monthlyIncome)}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <ArrowDownCircle className="w-4 h-4 text-rose-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Despesas do Mês
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1">
            {formatCurrency(stats.monthlyExpense)}
          </span>
        </div>
      </div>
    </div>
  );
}
