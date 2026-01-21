import React, { Dispatch, useEffect, useRef, useState } from 'react';

interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  className?: string;
  options: Option[];
  selectedIds: string[];
  setSelectedIds: Dispatch<React.SetStateAction<string[]>>;
  addButtonLabel: string;
}

export const MultiSelect = ({
  className,
  options,
  selectedIds,
  setSelectedIds,
  addButtonLabel,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const removeOption = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevents the dropdown from toggling
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const selectedLabels = options.filter((opt) => selectedIds.includes(opt.id));

  return (
    <div
      className={`relative w-full max-w-md border p-2 bg-gray-100 rounded-md ${className}`}
      ref={containerRef}
    >
      <div className="flex flex-wrap gap-1.5 items-center">
        {selectedLabels.length > 0 &&
          selectedLabels.map((opt) => (
            <span
              key={opt.id}
              className="flex items-center p-4 bg-white rounded border border-gray-200 text-sm font-medium animate-in fade-in zoom-in duration-200"
            >
              {opt.label}
              <button
                onClick={(e) => removeOption(e, opt.id)}
                className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between min-h-[44px] px-3 py-2 text-sm border-2 border-dashed bg-white rounded-md shadow-sm transition-all focus:outline-none  ${
            isOpen ? 'border-dashed border-blue-500' : 'border-gray-300 '
          }`}
        >
          {addButtonLabel}
        </button>
      </div>
      {isOpen && (
        <div
          className="z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl 
          fixed lg:absolute left-0 right-0 bottom-0 lg:bottom-auto p-4 lg:p-0
        "
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 lg:hidden" />
          <div className="max-h-64 overflow-y-auto p-2 space-y-1">
            {options.map((option) => (
              <label
                key={option.id}
                className={`
                  flex items-center px-3 py-2.5 lg:py-2 text-sm rounded-md cursor-pointer transition-colors
                  ${selectedIds.includes(option.id) ? 'bg-blue-50' : 'hover:bg-gray-100'}
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(option.id)}
                  onChange={() => toggleOption(option.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span
                  className={`ml-3 ${selectedIds.includes(option.id) ? 'text-blue-900 font-medium' : 'text-gray-700'}`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {/* ACTION FOOTER */}
          <div className="flex items-center justify-between p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const MultiSelectMemo = React.memo(MultiSelect);
