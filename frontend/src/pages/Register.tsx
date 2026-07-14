import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";

import { REGISTER_MUTATION } from "@/graphql/mutations";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Wallet, User, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(1, "O nome completo é obrigatório."),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Insira um e-mail válido."),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const [registerUser] = useMutation(REGISTER_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (formData: RegisterFormData) => {
    setApiError("");
    try {
      const { data } = await registerUser({
        variables: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });

      if (data?.register?.token) {
        localStorage.setItem("@financy:token", data.register.token);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      setApiError(
        err.message || "Ocorreu um erro ao tentar criar a sua conta.",
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
            Criar conta
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Comece a controlar suas finanças ainda hoje
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Input
            label="Nome completo"
            placeholder="Seu nome completo"
            icon={<User className="w-4 h-4" />}
            error={errors.name?.message}
            {...register("name")}
          />

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
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-200"></div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">
            ou
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600 font-medium">Já tem uma conta?</p>
          <Link to="/login" className="w-full">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Fazer login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
