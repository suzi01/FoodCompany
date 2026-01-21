import { InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
  name: string;
}

export const Input = ({
  label,
  className,
  error,
  name,
  ...props
}: InputProps) => {
  const inputId = useId();
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className=" text-gray-500">
        {label}
      </label>
      <input
        type="text"
        id={inputId}
        name={name}
        aria-invalid={error ? 'true' : 'false'}
        className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
        {...props}
      />
    </div>
  );
};
