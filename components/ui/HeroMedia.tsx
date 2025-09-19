'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Button } from './button';

const HERO_MEDIA = {
  poster:
    'https://images.unsplash.com/photo-1528747008803-1f5c1cbd87d0?auto=format&fit=crop&w=2000&q=80',
  video:
    'https://assets.mixkit.co/videos/download/mixkit-people-racing-go-karts-on-a-track-5022-large.mp4',
};

export function HeroMedia() {
  const t = useTranslations('home');
  const prefersReducedMotion = useReducedMotion();

  const motionProps = useMemo(
    () =>
      prefersReducedMotion
        ? { initial: false, animate: { opacity: 1, y: 0 } }
        : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
    [prefersReducedMotion],
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 shadow-2xl">
      {prefersReducedMotion ? (
        <Image
          src={HERO_MEDIA.poster}
          alt="Pilotes de karting au départ"
          width={1920}
          height={1080}
          priority
          className="h-[520px] w-full object-cover"
        />
      ) : (
        <video
          className="h-[520px] w-full object-cover"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          poster={HERO_MEDIA.poster}
          preload="metadata"
          aria-hidden
        >
          <source src={HERO_MEDIA.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/60 to-transparent" />
      <motion.div
        {...motionProps}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col justify-center gap-6 px-8 py-12 sm:px-14 lg:px-20"
      >
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary/90">
          {t('tagline')}
        </p>
        <h1 className="max-w-3xl text-4xl font-heading font-semibold text-foreground drop-shadow-2xl sm:text-5xl lg:text-6xl">
          {t('heroTitle')}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{t('heroSubtitle')}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <a href="#reservation">{t('heroCtas.primary')}</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="/offres">{t('heroCtas.secondary')}</a>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <a href="/pistes">{t('heroCtas.tertiary')}</a>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.45em] text-muted-foreground/80">
          <span>{t('melbourne.title')}</span>
          <span>•</span>
          <span>FFSA</span>
          <span>•</span>
          <span>ANCV</span>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -bottom-24 -right-32 hidden h-80 w-80 rounded-full bg-primary/30 blur-3xl lg:block" />
    </section>
  );
}
