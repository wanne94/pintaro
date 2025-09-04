'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get locale from pathname - German is at root
  let locale = 'de'; // Default to German
  if (pathname.startsWith('/en')) {
    locale = 'en';
  } else if (pathname.startsWith('/it')) {
    locale = 'it';
  }
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    // German goes to root, other languages to /locale
    if (newLocale === 'de') {
      // For German, go to root
      const currentPathWithoutLocale = pathname.replace(/^\/(en|it|de)/, '');
      const newPath = currentPathWithoutLocale || '/';
      router.push(newPath);
    } else {
      // For other languages, add locale prefix
      const currentPathWithoutLocale = pathname.replace(/^\/(en|it|de)/, '');
      const newPath = `/${newLocale}${currentPathWithoutLocale || ''}`;
      router.push(newPath);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-gray-700 font-medium">
          {currentLanguage.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 min-h-[44px] hover:bg-gray-50 transition-colors ${
                lang.code === locale ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className={`${lang.code === locale ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                {lang.name}
              </span>
              {lang.code === locale && (
                <span className="ml-auto w-2 h-2 rounded-full" style={{backgroundColor: '#5ab324'}} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}