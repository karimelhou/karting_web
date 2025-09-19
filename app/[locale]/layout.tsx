import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { LocaleProvider } from '@/components/providers/locale-provider';
import { PwaProvider } from '@/components/providers/pwa-provider';
import { locales } from '@/lib/i18n/request';
import { defaultMetadata } from '@/lib/seo';

export const metadata: Metadata = defaultMetadata;
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <>
      <PwaProvider />
      <LocaleProvider locale={locale} messages={messages}>
        {children}
      </LocaleProvider>
    </>
  );
}
