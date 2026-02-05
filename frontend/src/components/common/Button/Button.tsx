import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

const buttonColours = {
  primary:
    'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ',
  secondary:
    'bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500',
  tertiary:
    'bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={`border rounded-md p-4 ${buttonColours[variant]}`}
      {...props}
    />
  );
};
