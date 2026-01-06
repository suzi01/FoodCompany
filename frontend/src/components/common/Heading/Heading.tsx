import React, { JSX } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ level = 1, children, className }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
};
