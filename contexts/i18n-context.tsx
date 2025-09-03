'use client';

import React, { createContext, useContext } from 'react';

interface I18nContextType {
  locale: string;
  messages: any;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ 
  children, 
  locale, 
  messages 
}: { 
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext);
  
  if (!context) {
    // Try to get messages from DOM if context is not available
    if (typeof window !== 'undefined') {
      const dataElement = document.querySelector('[data-messages]');
      if (dataElement) {
        const messages = JSON.parse(dataElement.getAttribute('data-messages') || '{}');
        const locale = dataElement.getAttribute('data-locale') || 'en';
        
        return (key: string) => {
          if (namespace) {
            return messages[namespace]?.[key] || key;
          }
          return messages[key] || key;
        };
      }
    }
    
    // Fallback
    return (key: string) => key;
  }
  
  return (key: string) => {
    if (namespace) {
      return context.messages[namespace]?.[key] || key;
    }
    return context.messages[key] || key;
  };
}

export function useLocale() {
  const context = useContext(I18nContext);
  
  if (!context) {
    // Try to get locale from DOM if context is not available
    if (typeof window !== 'undefined') {
      const dataElement = document.querySelector('[data-locale]');
      if (dataElement) {
        return dataElement.getAttribute('data-locale') || 'en';
      }
      // Also try to get from pathname
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/(de|en|it)/);
      if (match) {
        return match[1];
      }
    }
    return 'en';
  }
  
  return context.locale;
}