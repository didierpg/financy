import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'danger' | 'ghost' | 'gray';
}

export function IconButton({ icon, variant = 'gray', className = '', ...props }: IconButtonProps) {
  const variantClasses = {
    danger: 'text-gray-400 hover:text-danger hover:bg-red-50',
    gray: 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
    ghost: 'text-gray-400 hover:text-gray-600 bg-transparent',
  };

  return (
    <button
      {...props}
      className={`p-1.5 rounded-md transition-colors cursor-pointer flex items-center justify-center ${variantClasses[variant]} ${className}`}
    >
      {icon}
    </button>
  );
}