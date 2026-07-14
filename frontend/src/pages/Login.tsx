import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Wallet, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/graphql/mutations";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const [loginUser] = useMutation(LOGIN_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (formData: LoginFormData) => {
    setApiError("");
    try {
      const { data } = await loginUser({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.login?.token) {
        localStorage.setItem("@financy:token", data.login.token);

        navigate("/");
      }
    } catch (err: any) {
      setApiError(
        err.message || "Credenciais inválidas. Verifique seu e-mail e senha.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 text-brand-dark font-bold text-2xl tracking-tight mb-6">
        <Wallet className="w-7 h-7 text-brand-base" />
        <span>FINANCY</span>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200 shadow-xs">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Fazer login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Entre na sua conta para continuar
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Input
            label="E-mail"
            type="email"
            placeholder="mail@exemplo.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                className="hover:text-gray-600 transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            {...register("password")}
          />

          <div className="flex items-center justify-between w-full mt-0.5 text-xs font-medium">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-base focus:ring-brand-base/20 accent-brand-base cursor-pointer"
              />
              <span>Lembrar-me</span>
            </label>
            <button
              type="button"
              className="text-brand-base hover:text-brand-dark cursor-pointer transition-colors"
            >
              Recuperar senha
            </button>
          </div>

          {apiError && (
            <div className="p-3 bg-red-light border border-red-base/20 rounded-lg text-xs font-medium text-danger text-left">
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-200"></div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">
            ou
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600 font-medium">
            Ainda não tem uma conta?
          </p>
          <Link to="/register" className="w-full">
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
