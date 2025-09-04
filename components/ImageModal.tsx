'use client';

import { useEffect, memo, useState, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const ImageModal = ({ 
  isOpen, 
  imageSrc, 
  imageAlt, 
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}: ImageModalProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrevious && hasPrevious) onPrevious();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext && onNext) {
      onNext();
    }
    if (isRightSwipe && hasPrevious && onPrevious) {
      onPrevious();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      {hasPrevious && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <div 
        className="relative max-w-[95vw] sm:max-w-[90vw] max-h-[85vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="object-contain max-w-full max-h-[85vh] sm:max-h-[90vh] w-auto h-auto"
          priority
        />
        {/* Mobile swipe indicator */}
        <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          <div className="w-8 h-1 bg-white/60 rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(ImageModal);