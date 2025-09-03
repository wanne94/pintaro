// Helper to get translations for components
import { getMessages } from './i18n';

export async function getTranslations(locale: string, namespace?: string) {
  const messages = await getMessages(locale);
  
  if (namespace) {
    return messages[namespace] || {};
  }
  
  return messages;
}