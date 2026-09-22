import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, DICTIONARY } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('sarthx_selected_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const triggerDOMTranslation = useCallback((langCode) => {
    if (typeof document === 'undefined') return;

    try {
      const host = window.location.hostname;
      const target = langCode || 'en';

      if (target === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
        document.cookie = 'googtrans=/en/en; path=/;';
      } else {
        document.cookie = `googtrans=/en/${target}; path=/;`;
        document.cookie = `googtrans=/en/${target}; path=/; domain=${host};`;
        document.cookie = `googtrans=/en/${target}; path=/; domain=.${host};`;
      }

      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = target;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } catch (err) {
      console.warn('DOM translation error:', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sarthx_selected_language', currentLang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
    }

    // Trigger DOM translation if non-English or restoring
    triggerDOMTranslation(currentLang);
    const t1 = setTimeout(() => triggerDOMTranslation(currentLang), 300);
    const t2 = setTimeout(() => triggerDOMTranslation(currentLang), 800);
    const t3 = setTimeout(() => triggerDOMTranslation(currentLang), 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentLang, triggerDOMTranslation]);

  const changeLanguage = (langCode) => {
    if (SUPPORTED_LANGUAGES.some(l => l.code === langCode)) {
      setCurrentLang(langCode);
      try {
        localStorage.setItem('sarthx_selected_language', langCode);
      } catch {}

      triggerDOMTranslation(langCode);
      setTimeout(() => triggerDOMTranslation(langCode), 150);
      setTimeout(() => triggerDOMTranslation(langCode), 500);
      setTimeout(() => triggerDOMTranslation(langCode), 1000);
    }
  };

  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const dict = DICTIONARY[currentLang];
    if (dict && dict[key] !== undefined && dict[key] !== '') {
      return dict[key];
    }
    // Fallback to English
    const enDict = DICTIONARY['en'];
    if (enDict && enDict[key] !== undefined && enDict[key] !== '') {
      return enDict[key];
    }
    return fallback || key;
  };

  const currentLanguageMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      changeLanguage, 
      triggerDOMTranslation,
      t, 
      supportedLanguages: SUPPORTED_LANGUAGES, 
      currentLanguageMeta 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
