'use client';

import { useState, memo, lazy, Suspense } from 'react';
import Image from 'next/image';
import { Home, Building2, Briefcase, Camera, Award } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

const ImageModal = lazy(() => import('./ImageModal'));

type TranslationValue = string | string[] | { [key: string]: unknown };

interface GalleryProps {
  messages: Record<string, TranslationValue>;
  locale: string;
}

const Gallery = ({ messages }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
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


  const beforeAfterProjects = [
    {
      id: 1,
      category: 'facades',
      title: 'Fassadensanierung',
      beforeImage: '/images/gallery/facades/facade1-before.jpg',
      afterImage: '/images/gallery/facades/facade1-after.jpg',
      description: 'Komplette Fassadenerneuerung mit Gerüstbau'
    },
    {
      id: 2,
      category: 'facades',
      title: 'Mehrfamilienhaus',
      beforeImage: '/images/gallery/facades/facade2-before-new.jpg',
      afterImage: '/images/gallery/facades/facade2-after-new.jpg',
      description: 'Renovierung eines mehrstöckigen Gebäudes'
    },
    {
      id: 3,
      category: 'interior',
      title: 'Großraum Renovierung',
      beforeImage: '/images/gallery/specialty/geometric-before.jpg',
      afterImage: '/images/gallery/specialty/geometric-after.jpg',
      description: 'Geometrische Wandgestaltung'
    },
    {
      id: 4,
      category: 'interior',
      title: 'Dachgeschoss Ausbau',
      beforeImage: '/images/gallery/interiors/interior2-before.jpg',
      afterImage: '/images/gallery/interiors/interior2-after.jpg',
      description: 'Kompletter Dachgeschossausbau'
    }
  ];

  const galleryImages = [
    // Previous specialty images
    {
      id: 1,
      image: '/images/gallery/specialty/mountains-wall.jpg',
      title: 'Kreative Wandgestaltung'
    },
    {
      id: 2,
      image: '/images/gallery/specialty/geometric-orange.jpg',
      title: 'Geometrische Muster'
    },
    {
      id: 3,
      image: '/images/gallery/specialty/textured-plaster1.jpg',
      title: 'Strukturputz'
    },
    {
      id: 4,
      image: '/images/gallery/specialty/textured-plaster2.jpg',
      title: 'Dekorativer Putz'
    },
    // Additional gallery images
    {
      id: 5,
      image: '/images/gallery/additional/facade-bricklaying.jpg',
      title: 'Fassade Mauerarbeiten'
    },
    {
      id: 6,
      image: '/images/gallery/additional/facade-building.jpg',
      title: 'Fassadenbau'
    },
    {
      id: 7,
      image: '/images/gallery/additional/flooring-laminate-samples.jpg',
      title: 'Laminat Muster'
    },
    {
      id: 8,
      image: '/images/gallery/additional/flooring-laminate-tools.jpg',
      title: 'Bodenverlegung'
    },
    {
      id: 9,
      image: '/images/gallery/additional/flooring-oak-wood.jpg',
      title: 'Eichenholzboden'
    },
    {
      id: 10,
      image: '/images/gallery/additional/general-renovation-planks.jpg',
      title: 'Renovierungsarbeiten'
    },
    {
      id: 11,
      image: '/images/gallery/additional/general-tile-installation.jpg',
      title: 'Fliesenverlegung'
    },
    {
      id: 12,
      image: '/images/gallery/additional/painting-brush-bucket.jpg',
      title: 'Malerarbeiten'
    },
    {
      id: 13,
      image: '/images/gallery/additional/painting-female-painter.jpg',
      title: 'Professionelle Malerei'
    },
    {
      id: 14,
      image: '/images/gallery/additional/painting-tools.jpg',
      title: 'Malerwerkzeuge'
    },
    {
      id: 15,
      image: '/images/gallery/additional/plastering-hand-glove.jpg',
      title: 'Verputzarbeiten'
    },
    {
      id: 16,
      image: '/images/gallery/additional/plastering-worker-wall.jpg',
      title: 'Wandverputzung'
    },
    {
      id: 17,
      image: '/images/gallery/additional/facade2-after.jpg',
      title: 'Fassade Nachher'
    },
    {
      id: 18,
      image: '/images/gallery/additional/facade2-before.jpg',
      title: 'Fassade Vorher'
    },
    {
      id: 19,
      image: '/images/gallery/additional/interior1-after.jpg',
      title: 'Innenraum Nachher'
    },
    {
      id: 20,
      image: '/images/gallery/additional/interior1-before.jpg',
      title: 'Innenraum Vorher'
    }
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const projectCategories = [
    {
      icon: Home,
      text: t('projectTypes.apartments'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Building2,
      text: t('projectTypes.facades'),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Briefcase,
      text: t('projectTypes.business'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Camera className="w-6 h-6" style={{color: '#5ab324'}} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{color: '#5ab324'}}>
              GALERIE
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Project Types Cards */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-gray-700 font-medium mb-8">{t('description')}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {projectCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="group relative">
                    <div className={`${category.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                      <div className={`w-14 h-14 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-7 h-7 ${category.color}`} />
                      </div>
                      <p className="text-gray-800 font-medium">{category.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Before/After Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px bg-gray-300 w-20"></div>
            <Award className="w-8 h-8" style={{color: '#5ab324'}} />
            <div className="h-px bg-gray-300 w-20"></div>
          </div>
          
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">
            Vorher / Nachher Projekte
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {beforeAfterProjects.map((project, index) => (
              <div key={project.id} className="space-y-4">
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  className="shadow-xl"
                  priority={index < 2}
                />
                <div className="text-center">
                  <h4 className="font-bold text-lg text-gray-800">{project.title}</h4>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">
            Galerija
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="group">
                <div 
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="font-bold text-sm md:text-base">{image.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <Suspense fallback={null}>
            <ImageModal
              isOpen={true}
              imageSrc={galleryImages[selectedImageIndex].image}
              imageAlt={galleryImages[selectedImageIndex].title}
              onClose={handleCloseModal}
              onPrevious={handlePreviousImage}
              onNext={handleNextImage}
              hasPrevious={selectedImageIndex > 0}
              hasNext={selectedImageIndex < galleryImages.length - 1}
            />
          </Suspense>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-800 font-semibold mb-8 flex items-center justify-center gap-3">
              <span className="text-2xl">📸</span>
              {t('cta')}
            </p>
            
            <a 
              href="#kontakt" 
              className="inline-flex items-center justify-center gap-3 text-white px-10 py-5 rounded-full transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              style={{
                backgroundColor: '#5ab324',
                backgroundImage: 'linear-gradient(135deg, #5ab324 0%, #4a9420 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, #4a9420 0%, #3a7418 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, #5ab324 0%, #4a9420 100%)';
              }}
            >
              {t('ctaButton')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Gallery);