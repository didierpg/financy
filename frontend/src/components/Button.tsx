import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full h-11 rounded-lg font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-brand-base text-white hover:bg-brand-dark": variant === 'primary',
            "bg-gray-200 text-gray-700 hover:bg-gray-300": variant === 'secondary',
            "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100": variant === 'outline',
            "bg-transparent text-gray-500 hover:bg-gray-100": variant === 'ghost',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';