// app/components/ProvidersWrapper.tsx
'use client';

import { LanguageProvider } from '../context/LanguageContext';

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
