import { Wallet, ArrowUpRight, TrendingUp } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8 flex flex-col items-center justify-center gap-6">
      {/* Container de Teste do Vetor/Logo */}
      <div className="flex items-center gap-2 text-brand-dark font-bold text-3xl tracking-tight">
        <Wallet className="w-8 h-8 text-brand-base" />
        <span>FINANCY</span>
      </div>

      <p className="text-gray-600 max-w-sm text-center text-sm">
        Ambiente do Front-end configurado com sucesso usando Vite, TypeScript e
        Tailwind v4.
      </p>

      {/* Grid para testar os tokens de cores injetados */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs flex items-center gap-3">
          <div className="p-2 bg-green-light rounded-full">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">
              Entradas
            </span>
            <span className="text-lg font-bold text-gray-800">
              R$ 15.000,00
            </span>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-xs flex items-center gap-3">
          <div className="p-2 bg-pink-light rounded-full">
            <ArrowUpRight className="w-5 h-5 text-danger" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">
              Saídas
            </span>
            <span className="text-lg font-bold text-gray-800">R$ 4.590,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
