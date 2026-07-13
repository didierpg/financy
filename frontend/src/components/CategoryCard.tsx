import { Trash2, Edit3 } from 'lucide-react';
import { CategoryIcon } from './CategoryIcon';
import { CategoryBadge } from './CategoryBadge';
import { IconButton } from './IconButton';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: number;
}

interface CategoryCardProps {
  category: CategoryData;
  onEdit?: (category: CategoryData) => void;
  onDelete?: (id: string) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col gap-4 relative hover:shadow-sm transition-shadow">
      
      {/* Topo: Ícone e Ações rápidas */}
      <div className="flex items-center justify-between">
        <CategoryIcon iconName={category.icon} colorName={category.color} />
        
        <div className="flex items-center gap-1">
          <IconButton 
            variant="danger" 
            icon={<Trash2 className="w-4 h-4" />} 
            title="Excluir"
            onClick={() => onDelete?.(category.id)}
          />
          <IconButton 
            variant="gray" 
            icon={<Edit3 className="w-4 h-4" />} 
            title="Editar"
            onClick={() => onEdit?.(category)}
          />
        </div>
      </div>

      {/* Centro: Título e Descrição */}
      <div className="flex flex-col gap-1 min-h-[72px]">
        <h3 className="font-bold text-gray-800 text-base tracking-tight">{category.name}</h3>
        <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">
          {category.description || 'Sem descrição cadastrada'}
        </p>
      </div>

      {/* Rodapé: Badge Colorido e Contador */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <CategoryBadge name={category.name} colorName={category.color} />
        <span className="text-xs text-gray-400 font-medium">
          {category.transactionCount} {category.transactionCount === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  );
}