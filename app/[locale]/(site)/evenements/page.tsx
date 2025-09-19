import { getTranslations } from 'next-intl/server';

import { EventExplorer } from '@/components/ui/EventExplorer';
import { upcomingEvents } from '@/lib/events';

export default async function EvenementsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'events' });
  const labels = {
    tracks: {
      label: t('filters.tracks.label'),
      all: t('filters.tracks.all'),
      '550m': t('filters.tracks.550'),
      '1150m': t('filters.tracks.1150'),
    },
    categories: {
      label: t('filters.categories.label'),
      all: t('filters.categories.all'),
      famille: t('filters.categories.family'),
      competition: t('filters.categories.competition'),
      entreprise: t('filters.categories.corporate'),
    },
    empty: t('filters.empty'),
  } as const;

  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Événements</p>
        <h1 className="section-heading">{t('title')}</h1>
        <p className="text-muted-foreground">{t('intro')}</p>
      </header>
      <EventExplorer events={upcomingEvents} labels={labels} />
    </div>
  );
}
