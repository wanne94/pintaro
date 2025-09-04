'use client';

import { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  onClick?: () => void;
}

export default function LazyImage({ src, alt, className, sizes, onClick }: LazyImageProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
    freezeOnceVisible: true,
  });

  return (
    <div 
      ref={elementRef}
      className={`relative w-full h-full ${!hasLoaded ? 'bg-gray-100 animate-pulse' : ''}`}
    >
      {isVisible && (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          className={className}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          onLoad={() => setHasLoaded(true)}
          onClick={onClick}
        />
      )}
    </div>
  );
}