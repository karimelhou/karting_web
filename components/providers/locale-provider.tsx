'use client';

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { ReactNode, useEffect } from 'react';

export function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
      {children}
    </NextIntlClientProvider>
  );
}
