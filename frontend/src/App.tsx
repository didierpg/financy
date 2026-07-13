import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { LogIn } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">
          Protótipo de Componentes
        </h2>

        <Input label="E-mail" placeholder="Digite seu e-mail" />
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          error="Senha incorreta demonstrativa"
        />

        <div className="flex flex-col gap-2 mt-2">
          <Button variant="primary">
            <LogIn className="w-4 h-4" />
            Entrar na Conta
          </Button>
          <Button variant="outline">Criar conta fictícia</Button>
        </div>
      </div>
    </div>
  );
}
