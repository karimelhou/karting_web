'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { loadAnalytics } from '@/lib/analytics';

import { Button } from './button';

const STORAGE_KEY = 'ke-cookie-consent';

type ConsentStatus = 'granted' | 'denied' | null;

export function CookieConsent() {
  const t = useTranslations('common');
  const [status, setStatus] = useState<ConsentStatus>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    if (stored) {
      setStatus(stored);
    }
  }, []);

  useEffect(() => {
    if (status === 'granted') {
      loadAnalytics(process.env.NEXT_PUBLIC_GA_ID);
    }
  }, [status]);

  if (status) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-6">
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-black/80 p-6 shadow-lg shadow-black/50 backdrop-blur">
        <p className="text-sm text-muted-foreground">{t('cookieMessage')}</p>
        <p className="mt-2 text-xs text-muted-foreground/80">{t('gaNotice')}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, 'granted');
              setStatus('granted');
            }}
          >
            {t('cookieAccept')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, 'denied');
              setStatus('denied');
            }}
          >
            {t('cookieDecline')}
          </Button>
        </div>
      </div>
    </div>
  );
}
