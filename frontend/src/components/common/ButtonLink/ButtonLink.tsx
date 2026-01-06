import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonLink = ({
  children,
  className,
  ...props
}: ButtonLinkProps) => (
  <Link
    className={`text-[#3C4CE3] underline underline-offset-8 font-medium ${className || ''}`}
    {...props}
  >
    {children}
  </Link>
);
