"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ms' | 'zh';

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, Record<Language, string>>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Import all translations
        const translationsModule = await import('../translations');
        setTranslations(translationsModule.default);
        
        // Get saved language from localStorage if available
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && ['en', 'ms', 'zh'].includes(savedLanguage)) {
          setLanguage(savedLanguage);
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsLoaded(true); // Set to true even on error to allow app to render
      }
    };

    loadTranslations();
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('language', language);
      // Update document language for accessibility
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
    }
  }, [language, isLoaded]);

  // Translation function
  const t = (key: string): string => {
    if (!isLoaded || Object.keys(translations).length === 0) {
      // Return key or a loading indicator if translations aren't ready
      return key; // Or some placeholder like "Loading..."
    }
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translations[key][language] || translations[key].en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 