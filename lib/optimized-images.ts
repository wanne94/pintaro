import placeholders from '../public/images/optimized/placeholders.json';

export interface OptimizedImage {
  src: string;
  webpSrc: string;
  placeholder: string;
  width: number;
  height: number;
}

const IMAGE_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  card: { width: 800, height: 600 },
  gallery: { width: 1200, height: 800 },
  thumbnail: { width: 400, height: 300 }
};

export function getOptimizedImage(name: string, size: 'hero' | 'card' | 'gallery' | 'thumbnail'): OptimizedImage {
  // Always append size to the name
  const baseName = `${name}-${size}`;
  // Remove any size suffix from the name for placeholder lookup
  const placeholderKey = name.replace(/-(?:hero|card|gallery|thumbnail)$/, '');
  
  return {
    src: `/images/optimized/${baseName}.jpeg`,
    webpSrc: `/images/optimized/${baseName}.webp`,
    placeholder: (placeholders as Record<string, string>)[placeholderKey] || '',
    ...IMAGE_DIMENSIONS[size]
  };
}

export const serviceImages = {
  painting: {
    main: 'painting-main',
    gallery: ['painting-main', 'painting-gallery-1']
  },
  plastering: {
    main: 'plastering-main',
    gallery: ['plastering-main', 'plastering-gallery-1']
  },
  facade: {
    main: 'facade-main',
    gallery: ['facade-main', 'facade-gallery-1']
  },
  decorative: {
    main: 'decorative-main',
    gallery: ['decorative-main', 'painting-gallery-1']
  },
  mold: {
    main: 'mold-main',
    gallery: ['mold-main', 'mold-gallery-1']
  },
  flooring: {
    main: 'flooring-main',
    gallery: ['flooring-main', 'flooring-gallery-1', 'flooring-gallery-2']
  }
};