import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { X } from "lucide-react";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import {
  CATEGORIES_QUERY,
  PAGINATED_TRANSACTIONS_QUERY,
} from "@/graphql/queries";
import {
  CREATE_TRANSACTION_MUTATION,
  UPDATE_TRANSACTION_MUTATION,
} from "@/graphql/mutations";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: {
    id: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: string;
    categoryId: string;
  } | null;
}

export function TransactionModal({
  isOpen,
  onClose,
  transactionToEdit,
}: TransactionModalProps) {
  const isEditing = !!transactionToEdit;

  const [description, setDescription] = useState("");
  const [amountStr, setAmountStr] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categoriesData } = useQuery(CATEGORIES_QUERY);
  const categories = categoriesData?.categories ?? [];

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  useEffect(() => {
    if (isOpen) {
      if (transactionToEdit) {
        setDescription(transactionToEdit.description);
        setAmountStr(
          (transactionToEdit.amount / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        );
        setType(transactionToEdit.type);

        const localDate = new Date(transactionToEdit.date);
        const yyyy = localDate.getUTCFullYear();
        const mm = String(localDate.getUTCMonth() + 1).padStart(2, "0");
        const dd = String(localDate.getUTCDate()).padStart(2, "0");
        setDate(`${yyyy}-${mm}-${dd}`);
        setCategoryId(transactionToEdit.categoryId);
      } else {
        setDescription("");
        setAmountStr("");
        setType("EXPENSE");

        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        setDate(`${yyyy}-${mm}-${dd}`);

        setCategoryId("");
      }
    }
  }, [isOpen, transactionToEdit]);

  const [createTransaction, { loading: creating }] = useMutation(
    CREATE_TRANSACTION_MUTATION,
    {
      refetchQueries: [{ query: PAGINATED_TRANSACTIONS_QUERY }],
      onCompleted: () => onClose(),
    },
  );

  const [updateTransaction, { loading: updating }] = useMutation(
    UPDATE_TRANSACTION_MUTATION,
    {
      refetchQueries: [{ query: PAGINATED_TRANSACTIONS_QUERY }],
      onCompleted: () => onClose(),
    },
  );

  const isLoading = creating || updating;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setAmountStr("");
      return;
    }
    const cents = parseInt(value, 10);
    const formatted = (cents / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setAmountStr(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !amountStr || !categoryId || !date) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const normalizedAmountStr = amountStr.replace(/\./g, "").replace(",", ".");
    const amountInCents = Math.round(parseFloat(normalizedAmountStr) * 100);

    // FIX DA DATA: Força a criação da string ISO interpretando o YYYY-MM-DD diretamente como meio-dia UTC.
    // Isso neutraliza fusos horários locais negativos evitando que mude o dia!
    const utcDateString = `${date}T12:00:00.000Z`;

    try {
      if (isEditing && transactionToEdit) {
        await updateTransaction({
          variables: {
            id: transactionToEdit.id,
            description,
            amount: amountInCents,
            type,
            date: utcDateString,
            categoryId,
          },
        });
      } else {
        await createTransaction({
          variables: {
            description,
            amount: amountInCents,
            type,
            date: utcDateString,
            categoryId,
          },
        });
      }
    } catch (err: any) {
      const errorMsg = err.graphQLErrors?.[0]?.message || err.message;
      alert(errorMsg || "Erro ao salvar a transação.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <div className="p-6 pb-4 flex items-start justify-between">
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-800">
              {isEditing ? "Editar transação" : "Nova transação"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Registre sua despesa ou receita
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2 flex flex-col gap-5">
          <div className="bg-white border border-gray-100 p-1.5 rounded-xl grid grid-cols-2 gap-2 shadow-xs">
            <button
              type="button"
              onClick={() => setType("EXPENSE")}
              className={`h-11 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                type === "EXPENSE"
                  ? "bg-white border border-red-200 text-danger shadow-xs"
                  : "text-gray-500 hover:bg-gray-50/50"
              }`}
            >
              <span className="text-[10px] font-extrabold w-4 h-4 rounded-full bg-red-50 flex items-center justify-center text-danger border border-red-100">
                ↓
              </span>
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("INCOME")}
              className={`h-11 rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                type === "INCOME"
                  ? "bg-white border border-emerald-200 text-brand-base shadow-xs"
                  : "text-gray-500 hover:bg-gray-50/50"
              }`}
            >
              <span className="text-[10px] font-extrabold w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-brand-base border border-emerald-100">
                ↑
              </span>
              Receita
            </button>
          </div>

          <Input
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-left w-full">
              <label className="text-sm font-semibold text-gray-700">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isLoading}
                required
                className="w-full h-11 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 px-3 focus:outline-none focus:border-brand-base focus:ring-1 focus:ring-brand-base/20 transition-all cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left w-full">
              <label className="text-sm font-semibold text-gray-700">
                Valor
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-800 font-medium">
                  R$
                </span>
                <input
                  type="text"
                  placeholder="0,00"
                  value={amountStr}
                  onChange={handleAmountChange}
                  disabled={isLoading}
                  required
                  className="w-full h-11 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 pl-10 pr-3 focus:outline-none focus:border-brand-base focus:ring-1 focus:ring-brand-base/20 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="relative z-20">
            <Select
              key={
                isEditing
                  ? `edit-${transactionToEdit?.id}-${categoryId}`
                  : `new-${categoryId}`
              }
              label="Categoria"
              options={categoryOptions}
              value={categoryId}
              onChange={(val) => setCategoryId(val)}
              placeholder="Selecione"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-brand-base hover:bg-brand-dark disabled:bg-brand-base/50 text-white font-semibold text-sm rounded-lg flex items-center justify-center transition-colors cursor-pointer mt-2"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
