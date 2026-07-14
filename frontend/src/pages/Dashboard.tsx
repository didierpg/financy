import { useQuery } from "@apollo/client/react";
import {
  CATEGORIES_QUERY,
  DASHBOARD_STATS_QUERY,
  PAGINATED_TRANSACTIONS_QUERY,
} from "@/graphql/queries";
import { formatCurrency } from "@/utils/format";
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronRight,
  Plus,
} from "lucide-react";
import { TransactionModal } from "@/components/TransactionModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCategoryColor, getCategoryIcon } from "@/utils/category-themes";

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  } catch {
    return "---";
  }
}

export function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // 1. Query de Estatísticas do Mês
  const {
    data,
    loading,
    error,
    refetch: refetchStats,
  } = useQuery(DASHBOARD_STATS_QUERY, {
    variables: {
      month: currentMonth,
      year: currentYear,
    },
    fetchPolicy: "cache-and-network",
  });

  // 2. Query de Transações Recentes (Últimas 5)
  const {
    data: transactionsData,
    loading: loadingTransactions,
    refetch: refetchTransactions,
  } = useQuery(PAGINATED_TRANSACTIONS_QUERY, {
    variables: { page: 1, limit: 5 },
    fetchPolicy: "cache-and-network",
  });

  // 3. Query de Categorias com Somatórios
  const {
    data: categoriesData,
    loading: loadingCategories,
    refetch: refetchCategories,
  } = useQuery(CATEGORIES_QUERY, {
    fetchPolicy: "cache-and-network",
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

  const recentTransactions = transactionsData?.transactions?.items ?? [];
  const categoriesList = categoriesData?.categories ?? [];

  // Centraliza o refetch de todas as pontas ao salvar uma transação
  const handleModalClose = () => {
    setIsModalOpen(false);
    refetchStats();
    refetchTransactions();
    refetchCategories();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Saldo Total
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1 text-left">
            {formatCurrency(stats.totalBalance)}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Receitas do Mês
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1 text-left">
            {formatCurrency(stats.monthlyIncome)}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <ArrowDownCircle className="w-4 h-4 text-rose-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Despesas do Mês
            </span>
          </div>
          <span className="text-3xl font-bold text-gray-800 tracking-tight mt-1 text-left">
            {formatCurrency(stats.monthlyExpense)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Transações Recentes
            </span>
            <button
              onClick={() => navigate("/transactions")}
              className="text-xs font-semibold text-brand-base hover:text-brand-dark flex items-center gap-1 transition-colors cursor-pointer"
            >
              Ver todas
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col divide-y divide-gray-100">
            {loadingTransactions ? (
              <div className="p-8 text-center text-sm text-gray-400 animate-pulse">
                Carregando transações recentes...
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                Nenhuma transação cadastrada até o momento.
              </div>
            ) : (
              recentTransactions.map((transaction) => {
                const categoryTheme = getCategoryColor(
                  transaction.category.color,
                );
                const IconComponent = getCategoryIcon(
                  transaction.category.icon,
                );
                const isExpense = transaction.type === "EXPENSE";

                return (
                  <div
                    key={transaction.id}
                    className="p-4 px-6 flex items-center justify-between hover:bg-gray-50/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${categoryTheme.bgClass} ${categoryTheme.textClass}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-sm">
                          {transaction.description}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryTheme.bgClass} ${categoryTheme.textClass}`}
                      >
                        {transaction.category.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-right">
                      <span className="font-bold text-sm text-gray-800">
                        {isExpense ? "-" : "+"}{" "}
                        {formatCurrency(transaction.amount)}
                      </span>
                      {isExpense ? (
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-danger">
                          <ArrowDownCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-brand-base">
                          <ArrowUpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-center bg-white/50">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-bold text-brand-base hover:text-brand-dark flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Nova transação
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Categorias
            </span>
            <button
              onClick={() => navigate("/categories")}
              className="text-xs font-semibold text-brand-base hover:text-brand-dark flex items-center gap-1 transition-colors cursor-pointer"
            >
              Gerenciar
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            {loadingCategories ? (
              <div className="p-4 text-center text-sm text-gray-400 animate-pulse">
                Carregando categorias...
              </div>
            ) : categoriesList.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-400">
                Nenhuma categoria criada.
              </div>
            ) : (
              categoriesList.map((category) => {
                const categoryTheme = getCategoryColor(category.color);

                return (
                  <div
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${categoryTheme.bgClass} ${categoryTheme.textClass}`}
                    >
                      {category.name}
                    </span>

                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-400 font-medium">
                        {category.transactionCount ?? 0}{" "}
                        {category.transactionCount === 1 ? "item" : "itens"}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {formatCurrency(category.totalAmount ?? 0)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        key={isModalOpen ? "open" : "closed"}
      />
    </div>
  );
}
