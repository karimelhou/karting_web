'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { LangSwitcher } from './LangSwitcher';

const links = [
  { href: '/experience', key: 'navigation.experience' },
  { href: '/pistes', key: 'navigation.tracks' },
  { href: '/offres', key: 'navigation.offers' },
  { href: '/billetterie', key: 'navigation.booking' },
  { href: '/galerie', key: 'navigation.gallery' },
  { href: '/restaurant', key: 'navigation.restaurant' },
  { href: '/evenements', key: 'navigation.events' },
  { href: '/actu', key: 'navigation.news' },
  { href: '/contact', key: 'navigation.contact' },
];

export function Nav() {
  const t = useTranslations();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setHasScrolled(latest > 32);
    });
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const height = useTransform(scrollY, [0, 120], [88, 64]);

  return (
    <motion.header
      style={{ height }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-center justify-center transition-colors',
        hasScrolled
          ? 'bg-black/70 backdrop-blur-md shadow-lg shadow-black/40'
          : 'bg-transparent',
      )}
    >
      <div className="container-grid flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-full px-3 py-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-lg">
            KE
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-sm uppercase tracking-[0.2em] text-primary/80">
              Karting Évasion
            </span>
            <span className="font-semibold text-base text-foreground">Rumilly</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full px-3 py-2',
                pathname === link.href && 'text-foreground',
              )}
            >
              {t(link.key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitcher />
          <Button asChild>
            <Link href="/billetterie">{t('common.book')}</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-foreground hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <motion.div
        id="mobile-nav"
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        className="absolute top-full w-full overflow-hidden border-t border-white/10 bg-black/90 lg:hidden"
      >
        <div className="container-grid flex flex-col gap-4 py-6">
          <LangSwitcher />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-transparent bg-surface/80 px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/50"
            >
              {t(link.key as Parameters<typeof t>[0])}
            </Link>
          ))}
          <Button asChild size="lg">
            <Link href="/billetterie">{t('common.book')}</Link>
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
}
