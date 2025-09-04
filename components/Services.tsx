'use client';

import { Paintbrush, Home, Palette, Shield, Droplets, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getOptimizedImage, serviceImages } from '@/lib/optimized-images';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface ServicesProps {
  messages: Record<string, TranslationValue>;
  locale?: string;
}

const Services = ({ messages, locale = 'de' }: ServicesProps) => {
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
  
  const services = [
    {
      icon: Paintbrush,
      key: 'painting',
      color: 'green',
    },
    {
      icon: Home,
      key: 'plastering',
      color: 'green',
    },
    {
      icon: Shield,
      key: 'facade',
      color: 'orange',
    },
    {
      icon: Palette,
      key: 'decorative',
      color: 'purple',
    },
    {
      icon: Droplets,
      key: 'mold',
      color: 'red',
    },
    {
      icon: Layers,
      key: 'flooring',
      color: 'blue',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="dienstleistungen" className="section-padding bg-gray-50">
      <div className="container-base">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const colors = getColorClasses(service.color);
            const Icon = service.icon;
            
            const title = t(`items.${service.key}.title`);
            const description = t(`items.${service.key}.description`);
            const features = [
              t(`items.${service.key}.features.0`),
              t(`items.${service.key}.features.1`),
              t(`items.${service.key}.features.2`),
              t(`items.${service.key}.features.3`),
            ];
            
            const imageKey = service.key as keyof typeof serviceImages;
            const cardImage = getOptimizedImage(serviceImages[imageKey]?.main || service.key, 'card');
            
            return (
              <div
                key={service.key}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-48 w-full">
                  <picture>
                    <source srcSet={cardImage.webpSrc} type="image/webp" />
                    <Image
                      src={cardImage.src}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={cardImage.placeholder}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    {title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} mt-1.5 flex-shrink-0`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={locale === 'de' ? `/services/${service.key}` : `/${locale}/services/${service.key}`}
                    className={`inline-flex items-center gap-2 ${colors.text} font-medium hover:gap-3 transition-all`}
                  >
                    {t('cta.learn')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#kontakt"
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg transition-colors font-semibold" style={{backgroundColor: '#5ab324'}}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
          >
            {t('cta.request')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;