interface HreflangProps {
  currentLocale: string;
  currentPath?: string;
}

export default function Hreflang({ currentLocale, currentPath = '' }: HreflangProps) {
  // Use production URL for static export
  const baseUrl = 'https://pintaro.ch';
  
  // Map short locale codes to full locale codes
  const localeMap: Record<string, string> = {
    'de': 'de-CH',
    'en': 'en-US', 
    'it': 'it-CH'
  };
  
  // Available locales
  const locales = ['de', 'en', 'it'];
  
  // Ensure path starts with /
  const path = currentPath ? (currentPath.startsWith('/') ? currentPath : `/${currentPath}`) : '';
  
  return (
    <>
      {/* Current locale */}
      <link 
        rel="alternate" 
        hrefLang={localeMap[currentLocale]} 
        href={`${baseUrl}/${currentLocale}${path}`} 
      />
      
      {/* Alternate locales */}
      {locales.filter(l => l !== currentLocale).map(altLocale => (
        <link 
          key={altLocale}
          rel="alternate" 
          hrefLang={localeMap[altLocale]} 
          href={`${baseUrl}/${altLocale}${path}`} 
        />
      ))}
      
      {/* x-default for language selector (using German as default) */}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}/de${path}`} 
      />
    </>
  );
}