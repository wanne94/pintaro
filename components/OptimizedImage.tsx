'use client';

import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onClick?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  fill,
  priority,
  sizes,
  style,
  onLoad,
  onClick,
}: OptimizedImageProps) {
  // Convert path to use optimized version
  const getOptimizedSrc = (originalSrc: string) => {
    // If already pointing to optimized, return as is
    if (originalSrc.includes('/optimized/')) {
      return originalSrc;
    }
    
    // Convert to optimized path
    const path = originalSrc.replace('/images/', '/images/optimized/');
    
    // Return object with WebP and fallback
    return path;
  };
  
  const optimizedSrc = getOptimizedSrc(src);
  const webpSrc = optimizedSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={optimizedSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        style={style}
        onLoad={onLoad}
        onClick={onClick}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='none' style='filter: url(%23b);' href='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAYHBf/EAB4QAAEEAgMBAAAAAAAAAAAAAAABAgQhBRIDIiM0/8QAFgEBAQEAAAAAAAAAAAAAAAAABQMG/8QAGREBAAMBAQAAAAAAAAAAAAAAAQACEQQD/9oADAMBAAIRAxEAPwCs8kdNVoWs7H6uocUtov51qaODuQNyW6bJVZMJkX3dQG+Z9DgHjxMmat1Os//Z'/%3E%3C/svg%3E"
      />
    </picture>
  );
}