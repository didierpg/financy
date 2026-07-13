import { getCategoryColor } from '@/utils/category-themes';

interface CategoryBadgeProps {
  name: string;
  colorName: string;
}

export function CategoryBadge({ name, colorName }: CategoryBadgeProps) {
  const colorTheme = getCategoryColor(colorName);

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-tight select-none ${colorTheme.badgeClass} ${colorTheme.badgeTextClass}`}>
      {name}
    </span>
  );
}