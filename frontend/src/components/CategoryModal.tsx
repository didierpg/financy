import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { cn } from "@/utils/cn";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/utils/category-themes";

import {
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "@/graphql/mutations";
import { CATEGORIES_QUERY } from "@/graphql/queries";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";

const categoryModalSchema = z.object({
  name: z.string().min(1, "O título é obrigatório."),
  description: z.string().optional(),
  icon: z.string().min(1, "Selecione um ícone para a categoria."),
  color: z.string().min(1, "Selecione uma cor para a categoria."),
});

type CategoryModalFormData = z.infer<typeof categoryModalSchema>;

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: CategoryData | null;
}

export function CategoryModal({
  isOpen,
  onClose,
  categoryToEdit,
}: CategoryModalProps) {
  const isEditing = !!categoryToEdit;

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryModalFormData>({
    resolver: zodResolver(categoryModalSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (categoryToEdit) {
        reset({
          name: categoryToEdit.name,
          description: categoryToEdit.description || "",
          icon: categoryToEdit.icon,
          color: categoryToEdit.color,
        });
      } else {
        reset({
          name: "",
          description: "",
          icon: "briefcase",
          color: "green",
        });
      }
    }
  }, [isOpen, categoryToEdit, reset]);

  if (!isOpen) return null;

  const handleSave = async (data: CategoryModalFormData) => {
    try {
      if (isEditing && categoryToEdit) {
        await updateCategory({
          variables: {
            updateCategoryId: categoryToEdit.id,
            name: data.name,
            icon: data.icon,
            color: data.color,
          },
        });
      } else {
        await createCategory({
          variables: {
            name: data.name,
            icon: data.icon,
            color: data.color,
            description: data.description || null,
          },
        });
      }
      onClose();
    } catch (err: any) {
      const graphQLErrorMessage =
        err.graphQLErrors?.[0]?.message || err.message;
      alert(graphQLErrorMessage || "Ocorreu um erro ao salvar a categoria.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-100 animate-fade-in animate-duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl flex flex-col gap-6 relative max-h-[90vh] overflow-y-auto">
        <div className="absolute top-4 right-4">
          <IconButton
            onClick={onClose}
            icon={<X className="w-5 h-5" />}
            variant="gray"
          />
        </div>

        <div className="text-left pr-10">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {isEditing ? "Editar categoria" : "Nova categoria"}
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            Organize suas transações com categorias
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSave)}
          noValidate
          className="flex flex-col gap-5"
        >
          <Input
            label="Título"
            placeholder="Ex. Alimentação"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Descrição"
            placeholder="Descrição da categoria"
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-gray-700 tracking-wide">
              Ícone
            </span>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-8 gap-2 p-1">
                  {Object.entries(CATEGORY_ICONS).map(
                    ([key, IconComponent]) => {
                      const isSelected = field.value === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => field.onChange(key)}
                          className={cn(
                            "w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 transition-all cursor-pointer bg-white hover:bg-gray-50",
                            isSelected &&
                              "border-brand-base ring-2 ring-brand-base/20 text-brand-base font-semibold",
                          )}
                        >
                          <img />
                          <IconComponent className="w-4 h-4" />
                        </button>
                      );
                    },
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <span className="text-xs font-semibold text-gray-700 tracking-wide">
              Cor
            </span>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-7 gap-2 w-full p-0.5">
                  {Object.entries(CATEGORY_COLORS).map(([key, theme]) => {
                    const isSelected = field.value === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => field.onChange(key)}
                        className={cn(
                          "w-full h-8 rounded-lg border flex items-center justify-center p-[3px] transition-all cursor-pointer bg-white",
                          isSelected
                            ? "border-brand-base ring-2 ring-brand-base/20"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                      >
                        <div
                          className={cn(
                            "w-full h-full rounded-[5px]",
                            theme.dotClass,
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12 text-base font-semibold bg-brand-base hover:bg-brand-dark mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
