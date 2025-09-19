import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { createElement } from 'react';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  if (!requestedLocale || !locales.includes(requestedLocale as Locale)) {
    notFound();
  }

  const locale = requestedLocale as Locale;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    defaultTranslationValues: {
      br: () => createElement('br'),
    },
  };
});
