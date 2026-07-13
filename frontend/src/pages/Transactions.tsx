import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getCategoryColor, getCategoryIcon } from "@/utils/category-themes";
import { Input } from "@/components/Input";
import { IconButton } from "@/components/IconButton";
import { Select, SelectOption } from "@/components/Select";
import {
  PAGINATED_TRANSACTIONS_QUERY,
  CATEGORIES_QUERY,
} from "@/graphql/queries";
import { DELETE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { formatCurrency } from "@/utils/format";
import { TransactionModal } from "@/components/TransactionModal";

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

function generatePeriodOptions(): SelectOption[] {
  const options: SelectOption[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const tempDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );
    const monthLabel = tempDate.toLocaleString("pt-BR", { month: "long" });
    const formattedMonth =
      monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
    const year = tempDate.getFullYear();

    options.push({
      value: `${tempDate.getMonth() + 1}-${year}`,
      label: `${formattedMonth} / ${year}`,
    });
  }
  return options;
}

export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const periodOptions = useMemo(() => generatePeriodOptions(), []);
  const [selectedPeriod, setSelectedPeriod] = useState<string>(
    periodOptions[0].value,
  );

  const [queryMonth, queryYear] = useMemo(() => {
    const [m, y] = selectedPeriod.split("-");
    return [Number(m), Number(y)];
  }, [selectedPeriod]);

  const { data: categoriesData } = useQuery(CATEGORIES_QUERY);

  const categoryOptions = useMemo(() => {
    const list = categoriesData?.categories ?? [];
    return [
      { value: "ALL", label: "Todas" },
      ...list.map((cat) => ({ value: cat.id, label: cat.name })),
    ];
  }, [categoriesData]);

  const typeOptions: SelectOption[] = [
    { value: "ALL", label: "Todos" },
    { value: "INCOME", label: "Entrada" },
    { value: "EXPENSE", label: "Saída" },
  ];

  const { data, loading, error, refetch } = useQuery(
    PAGINATED_TRANSACTIONS_QUERY,
    {
      variables: {
        page: currentPage,
        limit: itemsPerPage,
        search: search || undefined,
        type: selectedType === "ALL" ? undefined : (selectedType as any),
        categoryId: selectedCategory === "ALL" ? undefined : selectedCategory,
        month: queryMonth,
        year: queryYear,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  const handleOpenCreateModal = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction: any) => {
    setTransactionToEdit({
      id: transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      categoryId: transaction.categoryId,
    });
    setIsModalOpen(true);
  };

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = async (id: string, description: string) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir a transação "${description}"?`,
      )
    ) {
      try {
        await deleteTransaction({
          variables: { id },
        });
      } catch (err: any) {
        const errorMsg = err.graphQLErrors?.[0]?.message || err.message;
        alert(errorMsg || "Erro ao deletar transação.");
      }
    }
  };

  const transactionsData = data?.transactions;
  const transactionsList = transactionsData?.items ?? [];
  const totalCount = transactionsData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const fromIndex = totalCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const toIndex = Math.min(currentPage * itemsPerPage, totalCount);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Transações
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="h-10 bg-brand-base hover:bg-brand-dark text-white font-semibold text-sm px-4 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nova transação
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-6 items-end z-10">
          <Input
            label="Buscar"
            placeholder="Buscar por descrição"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            icon={<Search className="w-4 h-4" />}
          />

          <Select
            label="Tipo"
            options={typeOptions}
            value={selectedType}
            onChange={(val) => {
              setSelectedType(val);
              setCurrentPage(1);
            }}
          />

          <Select
            label="Categoria"
            options={categoryOptions}
            value={selectedCategory}
            onChange={(val) => {
              setSelectedCategory(val);
              setCurrentPage(1);
            }}
          />

          <Select
            label="Período"
            options={periodOptions}
            value={selectedPeriod}
            onChange={(val) => {
              setSelectedPeriod(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col z-0">
          {loading && transactionsList.length === 0 ? (
            <div className="p-12 text-center text-sm font-medium text-gray-400 animate-pulse">
              Carregando transações...
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 text-danger text-sm text-left">
              Erro ao carregar transações: {error.message}
            </div>
          ) : transactionsList.length === 0 ? (
            <div className="p-12 text-center text-sm font-medium text-gray-400">
              Nenhuma transação encontrada para os filtros aplicados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider pl-6 text-left">
                      Descrição
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                      Data
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                      Categoria
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                      Tipo
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                      Valor
                    </th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right pr-6">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactionsList.map((transaction) => {
                    const categoryTheme = getCategoryColor(
                      transaction.category.color,
                    );
                    const IconComponent = getCategoryIcon(
                      transaction.category.icon,
                    );
                    const isExpense = transaction.type === "EXPENSE";

                    return (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50/30 transition-colors"
                      >
                        <td className="p-4 pl-6 flex items-center gap-3 justify-start">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${categoryTheme.bgClass} ${categoryTheme.textClass}`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-gray-800 text-sm">
                            {transaction.description}
                          </span>
                        </td>

                        <td className="p-4 text-sm text-gray-400 font-medium text-center">
                          {formatDate(transaction.date)}
                        </td>

                        <td className="p-4 text-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryTheme.bgClass} ${categoryTheme.textClass}`}
                          >
                            {transaction.category.name}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          {isExpense ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-danger">
                              <span className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-[10px] font-extrabold">
                                ↓
                              </span>
                              Saída
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-base">
                              <span className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center text-[10px] font-extrabold">
                                ↑
                              </span>
                              Entrada
                            </span>
                          )}
                        </td>

                        <td className="p-4 font-bold text-sm text-gray-800 text-right">
                          {isExpense ? "-" : "+"}{" "}
                          {formatCurrency(transaction.amount)}
                        </td>

                        <td className="p-4 pr-6">
                          <div className="flex items-center justify-end gap-1">
                            <IconButton
                              variant="danger"
                              icon={<Trash2 className="w-4 h-4" />}
                              title="Excluir"
                              onClick={() =>
                                handleDelete(
                                  transaction.id,
                                  transaction.description,
                                )
                              }
                            />
                            <IconButton
                              variant="gray"
                              icon={<Edit3 className="w-4 h-4" />}
                              title="Editar"
                              onClick={() => handleOpenEditModal(transaction)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 pl-6 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-xs text-gray-400 font-medium">
              {fromIndex} a {toIndex} |{" "}
              <strong className="text-gray-500">{totalCount}</strong> resultados
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNumber = idx + 1;
                const isSelected = currentPage === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-brand-base border-brand-base text-white shadow-xs"
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactionToEdit={transactionToEdit}
      />
    </>
  );
}
