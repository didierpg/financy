import { getCategoryIcon, getCategoryColor } from '@/utils/category-themes';

interface CategoryIconProps {
  iconName: string;
  colorName: string;
  size?: 'sm' | 'md';
}

export function CategoryIcon({ iconName, colorName, size = 'md' }: CategoryIconProps) {
  const IconComponent = getCategoryIcon(iconName);
  const colorTheme = getCategoryColor(colorName);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  return (
    <div className={`${sizeClasses[size]} ${colorTheme.bgClass} flex items-center justify-center ${colorTheme.textClass}`}>
      <IconComponent className={iconSizes[size]} />
    </div>
  );
}