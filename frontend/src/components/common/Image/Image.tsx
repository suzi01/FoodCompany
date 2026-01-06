import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const Image = ({ src, alt, className, ...props }: ImageProps) => (
  <img src={src} alt={alt} className={className} loading="lazy" {...props} />
);
