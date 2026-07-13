import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
}

export function Select({ label, options, value, onChange, icon, placeholder = 'Selecione...' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 text-left w-full relative">
      {label && <span className="text-xs font-semibold text-gray-700 tracking-wide">{label}</span>}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-11 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 px-3 flex items-center justify-between transition-all cursor-pointer select-none",
          isOpen && "border-brand-base ring-2 ring-brand-base/20"
        )}
      >
        <div className="flex items-center gap-2 text-gray-800">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer hover:bg-gray-50/80",
                    isSelected ? "text-brand-base font-semibold" : "text-gray-600"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-brand-base" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}