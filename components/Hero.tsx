'use client';

import Link from 'next/link';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import { getOptimizedImage } from '@/lib/optimized-images';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface HeroProps {
  messages: Record<string, TranslationValue>;
}

const Hero = ({ messages }: HeroProps) => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages;
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const heroImage = getOptimizedImage('hero-renovation', 'hero');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}{' '}
              <span style={{color: '#5ab324'}}>{t('titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('subtitle')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t('benefits.experience')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t('benefits.consultation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t('benefits.warranty')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheckBig className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t('benefits.pricing')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#kontakt" 
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-lg transition-colors font-semibold" style={{backgroundColor: '#5ab324'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
              >
                {t('cta.quote')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#dienstleistungen" 
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors font-semibold"
              >
                {t('cta.services')}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
              <picture>
                <source srcSet={heroImage.webpSrc} type="image/webp" />
                <Image
                  src={heroImage.src}
                  alt={t('title')}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={heroImage.placeholder}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
