import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function FilterDropdown({ label, options, value, onChange, className = '', menuClassName = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const chooseOption = (nextValue) => {
    onChange(nextValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 text-left text-sm font-medium text-gray-800 outline-none transition-colors hover:border-gray-500 focus:border-gray-700 focus:ring-2 focus:ring-gray-900/10"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div id={menuId} role="group" aria-label={label} className={`absolute left-0 top-full z-50 mt-2 max-h-60 w-[min(19rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl ${menuClassName}`}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button key={option.value || 'all'} type="button" aria-pressed={isSelected} onClick={() => chooseOption(option.value)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50 ${isSelected ? 'bg-[#f7f3ed] font-semibold' : ''}`}>
                <span>{option.label}</span>
                {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8c6744]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
