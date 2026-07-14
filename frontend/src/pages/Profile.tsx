import { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut } from "lucide-react";
import { Input } from "@/components/Input";

import { ME_QUERY } from "@/graphql/queries";
import { UPDATE_ME_MUTATION } from "@/graphql/mutations";
import { UserAvatar } from "@/components/UserAvatar";

export function Profile() {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [updateMe, { loading: updating }] = useMutation(UPDATE_ME_MUTATION, {
    onCompleted: () => {
      setSuccessMessage("Perfil atualizado com sucesso!");
      refetch();
      setTimeout(() => setSuccessMessage(""), 4000);
    },
    onError: (err) => {
      alert(err.message || "Erro ao atualizar dados.");
    },
  });

  useEffect(() => {
    if (data?.me?.name) {
      setName(data.me.name);
    }
  }, [data]);

  const handleSignOut = async () => {
    localStorage.removeItem("@financy:token");
    await client.clearStore();
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateMe({
      variables: { name },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm font-medium text-gray-500 animate-pulse">
          Carregando informações do perfil...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-danger text-sm">
        Não foi possível carregar os dados da sua conta. Erro: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs w-full max-w-md p-8 flex flex-col items-center">
        <UserAvatar name={data?.me?.name} size="lg" className="mb-4" />

        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-gray-800">
            {data?.me?.name || "Conta teste"}
          </h2>
          <span className="text-xs text-gray-400 font-medium block mt-0.5">
            {data?.me?.email || "conta@teste.com"}
          </span>
        </div>

        <div className="w-full h-px bg-gray-200 mb-6" />

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 text-left"
        >
          <div className="relative">
            <Input
              icon={<User />}
              label="Nome completo"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={updating}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-semibold text-gray-700">
              E-mail
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={data?.me?.email || ""}
                disabled
                className="w-full h-11 bg-gray-50/50 border border-gray-150 rounded-lg text-sm text-gray-400 pl-10 pr-3 focus:outline-none cursor-not-allowed"
              />
            </div>
            <span className="text-[11px] text-gray-400 mt-0.5">
              O e-mail não pode ser alterado
            </span>
          </div>

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg text-xs font-semibold text-center animate-in fade-in duration-200">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={updating || !name.trim() || name === data?.me?.name}
            className="w-full h-11 bg-brand-base hover:bg-brand-dark disabled:bg-brand-base/50 text-white font-semibold text-sm rounded-lg flex items-center justify-center transition-colors cursor-pointer mt-2"
          >
            {updating ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full h-11 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-red-700 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer mt-4"
        >
          <LogOut className="w-4 h-4 stroke-[2.5] text-danger" />
          Sair da conta
        </button>
      </div>
    </div>
  );
}
