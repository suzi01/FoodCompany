import React from 'react';

interface CardProps {
  children: React.ReactNode;
  borderColor?: string;
  className?: string;
}

export const Card = ({ children, borderColor, className }: CardProps) => {
  return (
    <div
      className={`bg-white p-6 border-2 border-gray-300  border-t-${borderColor ? borderColor : 'gray'}-300 w-full rounded-lg ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
