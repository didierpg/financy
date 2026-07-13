import { useState } from "react";
import { Plus, Tag, ArrowLeftRight } from "lucide-react";
import { MOCK_CATEGORIES } from "@/mocks/categories";
import { getCategoryColor, getCategoryIcon } from "@/utils/category-themes";

import { CategoryCard } from "@/components/CategoryCard";
import { CategoryModal } from "@/components/CategoryModal";

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export function Categories() {
  const [categories] = useState(MOCK_CATEGORIES);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null,
  );

  const totalCategories = categories.length;
  const totalTransactions = categories.reduce(
    (acc, curr) => acc + curr.transactionCount,
    0,
  );
  const mostUsedCategory = [...categories].sort(
    (a, b) => b.transactionCount - a.transactionCount,
  )[0];

  const mostUsedColorTheme = mostUsedCategory
    ? getCategoryColor(mostUsedCategory.color)
    : null;
  const MostUsedIconComponent = mostUsedCategory
    ? getCategoryIcon(mostUsedCategory.icon)
    : Tag;

  const handleOpenNewCategoryModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditCategoryModal = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Categorias
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize suas transações por categorias
          </p>
        </div>
        <button
          onClick={handleOpenNewCategoryModal}
          className="h-10 bg-brand-base hover:bg-brand-dark text-white font-semibold text-sm px-4 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Nova categoria
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500">
            <Tag className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              {totalCategories}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total de categorias
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-purple-base">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              {totalTransactions}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total de transações
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${mostUsedColorTheme ? ` ${mostUsedColorTheme.textClass}` : "bg-blue-light text-blue-base"}`}
          >
            <MostUsedIconComponent className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              {mostUsedCategory?.name || "Nenhuma"}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Categoria mais utilizada
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleOpenEditCategoryModal}
            onDelete={(id) =>
              console.log("Confirmar exclusão da categoria com ID:", id)
            }
          />
        ))}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryToEdit={selectedCategory}
      />
    </div>
  );
}
