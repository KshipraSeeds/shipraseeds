
// app/context/LanguageContext.tsx
'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState('hi');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    fetch(`/locales/${lang}.json`)
      .then((res) => res.json())
      .then((data) => setTranslations(data));
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (key: string) => translations[key] || key }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
