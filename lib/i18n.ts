// Simple i18n solution without next-intl

export const locales = ['de', 'en', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

// Load messages for a specific locale
export async function getMessages(locale: string) {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to default locale
    const fallbackMessages = await import(`../messages/${defaultLocale}.json`);
    return fallbackMessages.default;
  }
}

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}