import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['de', 'en', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

// Routing config removed - using static export with .htaccess

export default getRequestConfig(async (context) => {
  const locale = context.locale;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    console.error('Invalid locale:', locale);
    notFound();
  }

  try {
    const messages = (await import(`./messages/${locale}.json`)).default;
    return {
      locale: locale,
      messages: messages,
      now: new Date(),
      timeZone: 'Europe/Zurich'
    };
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error);
    notFound();
  }
});