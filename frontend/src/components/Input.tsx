import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, rightElement, type = 'text', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <label 
          htmlFor={inputId} 
          className={cn(
            "text-xs font-semibold text-gray-700 tracking-wide transition-colors",
            error && "text-danger"
          )}
        >
          {label}
        </label>
        
        <div className="relative w-full flex items-center">
          {icon && (
            <div className={cn(
              "absolute left-3 text-gray-400 pointer-events-none flex items-center justify-center transition-colors",
              error && "text-danger"
            )}>
              {icon}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:border-brand-base focus:ring-2 focus:ring-brand-base/20 disabled:bg-gray-100 disabled:text-gray-400",
              icon ? "pl-10" : "px-3",
              rightElement ? "pr-10" : "",
              className,
              error && "border-danger focus:border-danger focus:ring-danger/20"
            )}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 text-gray-400 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-xs font-medium text-danger tracking-tight mt-0.5">
            {error}
          </span>
        ) : (
          helperText && (
            <span className="text-xs text-gray-400 tracking-tight mt-0.5">
              {helperText}
            </span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';