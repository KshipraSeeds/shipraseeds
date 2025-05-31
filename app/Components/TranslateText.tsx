// app/components/TranslatedText.tsx
'use client';

import { useLanguage } from '../context/LanguageContext';

export default function TranslatedText({ keyName }: { keyName: string }) {
  const { t } = useLanguage();
  return <>{t(keyName)}</>;
}
