import type { ReactNode } from 'react';

import { CookieConsent } from '@/components/ui/CookieConsent';
import { Footer } from '@/components/ui/Footer';
import { Nav } from '@/components/ui/Nav';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#main"
        className="absolute left-1/2 top-4 z-50 -translate-x-1/2 transform rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Passer au contenu
      </a>
      <Nav />
      <main id="main" className="flex-1 pt-28">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
