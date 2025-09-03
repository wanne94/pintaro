'use client';

import { ArrowRight, Check, Phone } from 'lucide-react';
import Link from 'next/link';
import { Paintbrush, Home, Shield, Palette, Droplets, Layers } from 'lucide-react';
import Image from 'next/image';
import { getOptimizedImage, serviceImages as optimizedServiceImages } from '@/lib/optimized-images';

interface ServiceDetailProps {
  service: string;
  messages: Record<string, unknown>;
  locale: string;
}

const ServiceDetail = ({ service, messages, locale }: ServiceDetailProps) => {
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

  const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    painting: Paintbrush,
    plastering: Home,
    facade: Shield,
    decorative: Palette,
    mold: Droplets,
    flooring: Layers,
  };

  const serviceKey = service as keyof typeof optimizedServiceImages;
  const serviceImageConfig = optimizedServiceImages[serviceKey] || optimizedServiceImages.painting;

  const Icon = serviceIcons[service] || Paintbrush;
  const mainImage = getOptimizedImage(serviceImageConfig.main, 'gallery');

  const serviceDetails = ((messages.serviceDetails as Record<string, unknown>)?.[service] as Record<string, unknown>) || {};
  const serviceInfo = (((messages.services as Record<string, unknown>)?.items as Record<string, unknown>)?.[service] as Record<string, unknown>) || {};

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet={mainImage.webpSrc} type="image/webp" />
            <Image
              src={mainImage.src}
              alt={(serviceInfo?.title as string) || ''}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={mainImage.placeholder}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full" style={{ backgroundColor: '#e8f5e1' }}>
              <Icon className="w-10 h-10 text-[#5ab324]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {(serviceInfo?.title as string) || ''}
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl">
              {(serviceInfo?.description as string) || ''}
            </p>
            <Link
              href={locale === 'de' ? '/#kontakt' : `/${locale}#kontakt`}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all hover:gap-3"
              style={{ backgroundColor: '#5ab324' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
            >
              {t('services.cta.request')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {(serviceDetails?.featuresTitle as string) || t('serviceDetails.ourServices')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(serviceInfo?.features as string[])?.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e8f5e1' }}>
                    <Check className="w-4 h-4" style={{ color: '#5ab324' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature}</h3>
                    <p className="text-gray-600">
                      {((serviceDetails?.features as Array<{description: string}>)?.[index]?.description) || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('serviceDetails.gallery') || 'Unsere Arbeiten'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceImageConfig.gallery.map((imageName, index) => {
                const galleryImage = getOptimizedImage(imageName, 'gallery');
                return (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <picture>
                      <source srcSet={galleryImage.webpSrc} type="image/webp" />
                      <Image
                        src={galleryImage.src}
                        alt={`${(serviceInfo?.title as string) || ''} - Bild ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={galleryImage.placeholder}
                      />
                    </picture>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {(serviceDetails?.processTitle as string) || t('serviceDetails.ourProcess')}
            </h2>
            <div className="space-y-6">
              {(serviceDetails?.process as Array<{ title: string; description: string }>)?.map((step: { title: string; description: string }, index: number) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: '#5ab324' }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              )) || (
                <>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#5ab324' }}>1</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('serviceDetails.consultation')}</h3>
                        <p className="text-gray-600">{t('serviceDetails.consultationDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#5ab324' }}>2</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('serviceDetails.planning')}</h3>
                        <p className="text-gray-600">{t('serviceDetails.planningDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#5ab324' }}>3</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('serviceDetails.execution')}</h3>
                        <p className="text-gray-600">{t('serviceDetails.executionDesc')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#5ab324' }}>4</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('serviceDetails.completion')}</h3>
                        <p className="text-gray-600">{t('serviceDetails.completionDesc')}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('serviceDetails.whyChooseUs')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('serviceDetails.experience')}
                </h3>
                <p className="text-gray-600">{t('serviceDetails.experienceDesc')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('serviceDetails.quality')}
                </h3>
                <p className="text-gray-600">{t('serviceDetails.qualityDesc')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('serviceDetails.warranty')}
                </h3>
                <p className="text-gray-600">{t('serviceDetails.warrantyDesc')}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('serviceDetails.pricing')}
                </h3>
                <p className="text-gray-600">{t('serviceDetails.pricingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('serviceDetails.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('serviceDetails.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={locale === 'de' ? '/#kontakt' : `/${locale}#kontakt`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all hover:gap-3"
                style={{ backgroundColor: '#5ab324' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a9420'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5ab324'}
              >
                {t('serviceDetails.getQuote')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+41765203556"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {t('serviceDetails.callUs')}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;