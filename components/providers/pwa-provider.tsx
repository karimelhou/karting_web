'use client';

import { useEffect } from 'react';

import { registerServiceWorker } from '@/lib/pwa';

export function PwaProvider() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
