'use client';

import { Award, Users, ThumbsUp, Wrench, Heart } from 'lucide-react';

type TranslationValue = string | string[] | { [key: string]: unknown };

interface AboutProps {
  messages: Record<string, TranslationValue>;
}

const About = ({ messages }: AboutProps) => {
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
  

  return (
    <section id="uber-uns" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              {t('paragraph1')}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {t('paragraph2')}
            </p>
            {t('paragraph3') !== 'paragraph3' && (
              <p className="text-lg text-gray-600 mb-6">
                {t('paragraph3')}
              </p>
            )}

            <div className="p-6 rounded-r-lg" style={{backgroundColor: '#f3faf0', borderLeft: '4px solid #5ab324'}}>
              <h3 className="font-semibold text-gray-900 mb-2">{t('philosophy.title')}</h3>
              <p className="text-gray-700">
                &quot;{t('philosophy.text')}&quot;
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{background: 'linear-gradient(to bottom right, #e8f5e1, #f3faf0)'}}>
                    <Users className="w-12 h-12" style={{color: '#5ab324'}} />
                    <span className="text-sm text-gray-600 font-medium">{t('images.team')}</span>
                  </div>
                </div>
                <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex flex-col items-center justify-center gap-2">
                    <Award className="w-12 h-12 text-green-600" />
                    <span className="text-sm text-gray-600 font-medium">{t('images.quality')}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-50 flex flex-col items-center justify-center gap-2">
                    <Wrench className="w-12 h-12 text-orange-600" />
                    <span className="text-sm text-gray-600 font-medium">{t('images.techniques')}</span>
                  </div>
                </div>
                <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex flex-col items-center justify-center gap-2">
                    <Heart className="w-12 h-12 text-purple-600" />
                    <span className="text-sm text-gray-600 font-medium">{t('images.customers')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('features.quality.title')}</h3>
            <p className="text-gray-600">
              {t('features.quality.description')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#e8f5e1'}}>
              <Users className="w-8 h-8" style={{color: '#5ab324'}} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('features.team.title')}</h3>
            <p className="text-gray-600">
              {t('features.team.description')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('features.satisfaction.title')}</h3>
            <p className="text-gray-600">
              {t('features.satisfaction.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;