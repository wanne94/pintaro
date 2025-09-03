'use client';

import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'de', name: 'DE', flag: '🇩🇪' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'it', name: 'IT', flag: '🇮🇹' },
];

export default function MobileLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Get locale from pathname - German is at root
  let locale = 'de'; // Default to German
  if (pathname.startsWith('/en')) {
    locale = 'en';
  } else if (pathname.startsWith('/it')) {
    locale = 'it';
  }

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
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center gap-1 px-2 py-1.5 rounded text-sm transition-all ${
            lang.code === locale 
              ? 'bg-gray-100 font-semibold' 
              : 'hover:bg-gray-50 opacity-70 hover:opacity-100'
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="text-gray-700">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}