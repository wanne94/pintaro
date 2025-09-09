'use client';

import { memo } from 'react';
import CompositeGallery from './CompositeGallery';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface GalleryProps {
  messages: Record<string, TranslationValue>;
  locale: string;
}

const Gallery = ({ messages }: GalleryProps) => {
  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-base">
        {/* Composite Before/After Gallery Section */}
        <CompositeGallery messages={messages} />
      </div>
    </section>
  );
};

export default memo(Gallery);