'use client';

import { useState, memo, lazy, Suspense, useMemo } from 'react';
import { Camera, Award } from 'lucide-react';
import Image from 'next/image';

const ImageModal = lazy(() => import('./ImageModal'));

type TranslationValue = string | string[] | { [key: string]: unknown };


interface CompositeGalleryProps {
  messages: Record<string, TranslationValue>;
}

const CompositeGallery = ({ messages }: CompositeGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
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

  const compositeProjects = useMemo(() => [
    {
      id: 1,
      name: 'projekt1-renovacija',
      title: t('compositeGallery.project1.title') || 'Projekt 1',
      category: 'interior' as const,
      description: t('compositeGallery.project1.description') || 'Opis projekta 1',
      featured: true
    },
    {
      id: 2,
      name: 'projekt2-fasada',
      title: t('compositeGallery.project2.title') || 'Projekt 2',
      category: 'facade' as const,
      description: t('compositeGallery.project2.description') || 'Opis projekta 2'
    },
    {
      id: 3,
      name: 'projekt3-enterijer',
      title: t('compositeGallery.project3.title') || 'Projekt 3',
      category: 'interior' as const,
      description: t('compositeGallery.project3.description') || 'Opis projekta 3'
    },
    {
      id: 4,
      name: 'projekt4-kompletno',
      title: t('compositeGallery.project4.title') || 'Projekt 4',
      category: 'complete' as const,
      description: t('compositeGallery.project4.description') || 'Opis projekta 4',
      featured: true
    },
    {
      id: 5,
      name: 'projekt5-transformacija',
      title: t('compositeGallery.project5.title') || 'Projekt 5',
      category: 'facade' as const,
      description: t('compositeGallery.project5.description') || 'Opis projekta 5'
    }
  ], [t]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
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
    if (selectedImageIndex !== null && selectedImageIndex < compositeProjects.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };




  return (
    <section className="py-16">
      <div className="container-base">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px bg-gray-300 w-20"></div>
            <Award className="w-8 h-8" style={{color: '#5ab324'}} />
            <div className="h-px bg-gray-300 w-20"></div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
            {t('compositeGallery.galleryTitle')}
          </h3>
          
          <p className="text-xl font-medium text-center mb-12" style={{color: '#5ab324'}}>
            {t('compositeGallery.beforeAfterSubtitle')}
          </p>
        </div>

        {/* Gallery Grid Container */}
        <div className="relative max-w-7xl mx-auto" role="region" aria-label="Galerija prije i poslije projekata">
          {/* Desktop Grid (3+2 layout) */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              {/* First row - 3 images */}
              <div className="grid grid-cols-3 gap-6">
                {compositeProjects.slice(0, 3).map((project, index) => (
                  <div key={project.id} className="relative">
                    {/* Main Image Container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square">
                      {/* Loading Skeleton */}
                      {imageLoading[index] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="text-gray-400">Učitava se...</div>
                        </div>
                      )}
                      
                      {/* Error State */}
                      {imageErrors[index] && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="text-gray-500 text-center">
                            <div className="text-2xl mb-2">📷</div>
                            <div>Slika se ne može učitati</div>
                          </div>
                        </div>
                      )}
                      
                      {!imageErrors[index] && (
                        <Image
                          src={`/images/optimized/gallery/projects/${project.name}.webp`}
                          alt={`${project.title} - prije i poslije transformacija`}
                          width={1920}
                          height={1920}
                          className="object-contain w-full h-full cursor-pointer bg-gray-50"
                          onClick={() => handleImageClick(index)}
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLMB5xmuanosD0nURuJgkZpOazLsJGU/ZCuOCEY/XVqHpU5KIBxQrJgwkgYnojdnNvuSkuOTdVq7lUiuHJjKVJlZnT6d+nq/vJTBHkI+7j8NqJFubCLNKTrDJqrj/1n0C50WOhRWd/cUqJGmWV1+5X7Gg+wdVWn6N27Lx/TvtrG/8AqmTd38q+I7l0KPELw2EqFw+asmtFaRlpCGFKsNjdRDFNgYGpTuoBn7OgRPM6b27HXhvZKHp1zdX9vfzWl4tPElvJpn/0n2bWHjNa9l3kKJHEJWkFPKZJtF7RXxhGOLK2kP8AbsU8Pf8APkVSh8jyQIwwQLZxkBGqAAqAEbHGBQAjKt3e8BDAQQtT7x8CDVV5bQkjCKYmk9oQhEWECZ1SoJgWiIvPM4pRdT0JlBaLKshPK8TI8jLa0xFdnJwJdV/1uMHNuJ2+8FdTY8//9k="
                          onLoadingComplete={() => handleImageLoad(index)}
                          onError={() => handleImageError(index)}
                          onLoadStart={() => handleImageLoadStart(index)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Second row - 2 images centered */}
              <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
                {compositeProjects.slice(3, 5).map((project, index) => (
                  <div key={project.id} className="relative">
                    {/* Main Image Container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square">
                      {/* Loading Skeleton */}
                      {imageLoading[index + 3] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <div className="text-gray-400">Učitava se...</div>
                        </div>
                      )}
                      
                      {/* Error State */}
                      {imageErrors[index + 3] && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="text-gray-500 text-center">
                            <div className="text-2xl mb-2">📷</div>
                            <div>Slika se ne može učitati</div>
                          </div>
                        </div>
                      )}
                      
                      {!imageErrors[index + 3] && (
                        <Image
                          src={`/images/optimized/gallery/projects/${project.name}.webp`}
                          alt={`${project.title} - prije i poslije transformacija`}
                          width={1920}
                          height={1920}
                          className="object-contain w-full h-full cursor-pointer bg-gray-50"
                          onClick={() => handleImageClick(index + 3)}
                          priority={false}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLMB5xmuanosD0nURuJgkZpOazLsJGU/ZCuOCEY/XVqHpU5KIBxQrJgwkgYnojdnNvuSkuOTdVq7lUiuHJjKVJlZnT6d+nq/vJTBHkI+7j8NqJFubCLNKTrDJqrj/1n0C50WOhRWd/cUqJGmWV1+5X7Gg+wdVWn6N27Lx/TvtrG/8AqmTd38q+I7l0KPELw2EqFw+asmtFaRlpCGFKsNjdRDFNgYGpTuoBn7OgRPM6b27HXhvZKHp1zdX9vfzWl4tPElvJpn/0n2bWHjNa9l3kKJHEJWkFPKZJtF7RXxhGOLK2kP8AbsU8Pf8APkVSh8jyQIwwQLZxkBGqAAqAEbHGBQAjKt3e8BDAQQtT7x8CDVV5bQkjCKYmk9oQhEWECZ1SoJgWiIvPM4pRdT0JlBaLKshPK8TI8jLa0xFdnJwJdV/1uMHNuJ2+8FdTY8//9k="
                          onLoadingComplete={() => handleImageLoad(index + 3)}
                          onError={() => handleImageError(index + 3)}
                          onLoadStart={() => handleImageLoadStart(index + 3)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Grid */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {compositeProjects.map((project, index) => (
                <div key={project.id} className="relative">
                  {/* Main Image Container */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square">
                    {/* Loading Skeleton */}
                    {imageLoading[index] && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">Učitava se...</div>
                      </div>
                    )}
                    
                    {/* Error State */}
                    {imageErrors[index] && (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                          <div className="text-2xl mb-2">📷</div>
                          <div className="text-sm">Slika se ne može učitati</div>
                        </div>
                      </div>
                    )}
                    
                    {!imageErrors[index] && (
                      <Image
                        src={`/images/optimized/gallery/projects/${project.name}.webp`}
                        alt={`${project.title} - prije i poslije transformacija`}
                        width={1920}
                        height={1920}
                        className="object-contain w-full h-full cursor-pointer bg-gray-50"
                        onClick={() => handleImageClick(index)}
                        priority={false}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLMB5xmuanosD0nURuJgkZpOazLsJGU/ZCuOCEY/XVqHpU5KIBxQrJgwkgYnojdnNvuSkuOTdVq7lUiuHJjKVJlZnT6d+nq/vJTBHkI+7j8NqJFubCLNKTrDJqrj/1n0C50WOhRWd/cUqJGmWV1+5X7Gg+wdVWn6N27Lx/TvtrG/8AqmTd38q+I7l0KPELw2EqFw+asmtFaRlpCGFKsNjdRDFNgYGpTuoBn7OgRPM6b27HXhvZKHp1zdX9vfzWl4tPElvJpn/0n2bWHjNa9l3kKJHEJWkFPKZJtF7RXxhGOLK2kP8AbsU8Pf8APkVSh8jyQIwwQLZxkBGqAAqAEbHGBQAjKt3e8BDAQQtT7x8CDVV5bQkjCKYmk9oQhEWECZ1SoJgWiIvPM4pRdT0JlBaLKshPK8TI8jLa0xFdnJwJdV/1uMHNuJ2+8FdTY8//9k="
                        onLoadingComplete={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                        onLoadStart={() => handleImageLoadStart(index)}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No navigation needed for static grid */}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-full">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5" style={{color: '#5ab324'}} />
              <span className="font-semibold text-gray-800">
                {compositeProjects.length} {t('compositeGallery.completedProjects')}
              </span>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <Suspense fallback={null}>
            <ImageModal
              isOpen={true}
              imageSrc={`/images/optimized/gallery/projects/${compositeProjects[selectedImageIndex].name}.webp`}
              imageAlt={compositeProjects[selectedImageIndex].title}
              onClose={handleCloseModal}
              onPrevious={handlePreviousImage}
              onNext={handleNextImage}
              hasPrevious={selectedImageIndex > 0}
              hasNext={selectedImageIndex < compositeProjects.length - 1}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default memo(CompositeGallery);