import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { createElement } from 'react';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    messages,
    defaultTranslationValues: {
      br: () => createElement('br'),
    },
  };
});
