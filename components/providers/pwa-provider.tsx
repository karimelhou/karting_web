'use client';

import { useEffect, useState } from 'react';

import { registerServiceWorker } from '@/lib/pwa';

export function PwaProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    const handler = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () =>
      window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  if (!visible || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] max-w-xs rounded-2xl border border-white/10 bg-black/80 p-4 text-sm text-muted-foreground shadow-lg">
      <p className="text-foreground font-semibold">Installer l’application</p>
      <p className="mt-1 text-xs">
        Accédez au site en un tap et hors connexion. Disponible sur iOS, Android et
        desktop.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          onClick={async () => {
            await deferredPrompt.prompt();
            const choice = await deferredPrompt.userChoice;
            if (choice?.outcome !== 'accepted') {
              setVisible(false);
            }
            setDeferredPrompt(null);
          }}
        >
          Installer
        </button>
        <button
          type="button"
          className="rounded-full border border-white/20 px-3 py-2 text-xs text-muted-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          onClick={() => {
            setVisible(false);
            setDeferredPrompt(null);
          }}
        >
          Plus tard
        </button>
      </div>
    </div>
  );
}

declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  }
}
