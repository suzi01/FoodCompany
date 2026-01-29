import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label: string;
  name: string;
  className?: string;
}

export const Select = ({ options, label, name, className, ...props }: SelectProps) => {
  return (
    <div className={`flex flex-col w-full gap-1 ${className}`}>
      <label htmlFor={name} className="text-gray-500 uppercase font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        {...props}
      >
        {options.map((option, index) => (
          <option key={`${index}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
