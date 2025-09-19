'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Link, usePathname } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { LangSwitcher } from './LangSwitcher';

type NavItem = {
  href: string;
  key: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { href: '/', key: 'navigation.home' },
  { href: '/experience', key: 'navigation.experience' },
  { href: '/pistes', key: 'navigation.tracks' },
  {
    href: '/offres',
    key: 'navigation.offers',
    children: [
      { href: '/offres/sessions', key: 'navigation.sessions' },
      { href: '/offres/grand-prix', key: 'navigation.grandPrix' },
      { href: '/offres/ecole-pilotage', key: 'navigation.drivingSchool' },
      { href: '/offres/groupes-entreprises', key: 'navigation.groups' },
    ],
  },
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
  const [isOffersOpen, setOffersOpen] = useState(false);
  const offersTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setHasScrolled(latest > 32);
    });
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
    setOffersOpen(false);
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
        <nav
          className="hidden items-center gap-4 lg:flex"
          aria-label="Navigation principale"
        >
          {navItems.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    pathname === item.href && 'text-foreground',
                  )}
                >
                  {t(item.key as Parameters<typeof t>[0])}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  if (offersTimeout.current) clearTimeout(offersTimeout.current);
                  setOffersOpen(true);
                }}
                onMouseLeave={() => {
                  offersTimeout.current = setTimeout(() => setOffersOpen(false), 150);
                }}
                onFocusCapture={() => setOffersOpen(true)}
                onBlurCapture={() => {
                  offersTimeout.current = setTimeout(() => setOffersOpen(false), 150);
                }}
              >
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    pathname.startsWith(item.href) && 'text-foreground',
                  )}
                  aria-expanded={isOffersOpen}
                  aria-haspopup="true"
                  onClick={() => setOffersOpen((prev) => !prev)}
                >
                  {t(item.key as Parameters<typeof t>[0])}
                  <span aria-hidden>▾</span>
                </button>
                {isOffersOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/85 p-4 shadow-xl backdrop-blur"
                    onMouseEnter={() => {
                      if (offersTimeout.current) clearTimeout(offersTimeout.current);
                      setOffersOpen(true);
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
                      {t('navigation.offers')}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex flex-col rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                          >
                            <span className="font-semibold text-foreground">
                              {t(child.key as Parameters<typeof t>[0])}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
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
          {navItems.map((item) => (
            <div key={item.href} className="space-y-2">
              <Link
                href={item.href}
                className="block rounded-xl border border-transparent bg-surface/80 px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/50"
              >
                {t(item.key as Parameters<typeof t>[0])}
              </Link>
              {item.children ? (
                <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 hover:bg-primary/10"
                    >
                      {t(child.key as Parameters<typeof t>[0])}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Button asChild size="lg">
            <Link href="/billetterie">{t('common.book')}</Link>
          </Button>
        </div>
      </motion.div>
    </motion.header>
  );
}
