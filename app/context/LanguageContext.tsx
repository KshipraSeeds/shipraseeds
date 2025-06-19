// app/context/LanguageContext.tsx
'use client';

import { createContext, useState, useContext, useEffect, useMemo } from 'react';

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState('hi');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    fetch(`/locales/${lang}.json`)
      .then((res) => res.json())
      .then((data) => setTranslations(data));
  }, [lang]);

  const t = useMemo(() => {
    return (key: string) => translations[key] || key;
  }, [translations]);

  const contextValue = useMemo(() => {
    return { lang, setLang, t };
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
