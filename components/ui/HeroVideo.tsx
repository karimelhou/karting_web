'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Button } from './button';

export function HeroVideo() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
      <video
        className="h-[520px] w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://upload.wikimedia.org/wikipedia/commons/7/75/Karting_Lehner_2009.jpg"
        preload="metadata"
      >
        <source
          src="https://assets.mixkit.co/videos/download/mixkit-people-racing-go-karts-on-a-track-5022-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
      <motion.div
        className="absolute inset-0 flex flex-col justify-center gap-6 px-8 py-12 sm:px-14 lg:px-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          {t('tagline')}
        </p>
        <h1 className="max-w-2xl text-4xl font-heading font-semibold text-foreground drop-shadow-2xl sm:text-5xl">
          {t('heroTitle')}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">{t('heroSubtitle')}</p>
        <div className="flex flex-wrap gap-4">
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
        <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-muted-foreground/80">
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
