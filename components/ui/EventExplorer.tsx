'use client';

import { useMemo, useState } from 'react';

import type { EventItem } from '@/lib/events';
import { cn } from '@/lib/utils';

type TrackLabels = Record<'all' | '550m' | '1150m', string> & { label: string };
type CategoryLabels = Record<'all' | 'famille' | 'competition' | 'entreprise', string> & {
  label: string;
};

type Labels = {
  tracks: TrackLabels;
  categories: CategoryLabels;
  empty: string;
};

const trackKeys = ['all', '550m', '1150m'] as const;
const categoryKeys = ['all', 'famille', 'competition', 'entreprise'] as const;

export function EventExplorer({
  events,
  labels,
}: {
  events: EventItem[];
  labels: Labels;
}) {
  const [track, setTrack] = useState<(typeof trackKeys)[number]>('all');
  const [category, setCategory] = useState<(typeof categoryKeys)[number]>('all');

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchTrack = track === 'all' || event.track === track;
      const matchCategory = category === 'all' || event.category === category;
      return matchTrack && matchCategory;
    });
  }, [events, track, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <fieldset className="flex flex-wrap gap-2" aria-label={labels.tracks.label}>
          <legend className="sr-only">{labels.tracks.label}</legend>
          {trackKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTrack(key)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
                track === key
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-white/15 text-muted-foreground hover:border-primary/40',
              )}
            >
              {labels.tracks[key]}
            </button>
          ))}
        </fieldset>
        <label className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {labels.categories.label}
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as (typeof categoryKeys)[number])
            }
            className="rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            {categoryKeys.map((key) => (
              <option key={key} value={key}>
                {labels.categories[key]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filteredEvents.map((event) => (
          <article
            key={event.slug}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              {labels.tracks[event.track]}
            </p>
            <h2 className="mt-2 text-xl font-heading text-foreground">{event.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
            <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>
          </article>
        ))}
        {filteredEvents.length === 0 && (
          <p className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted-foreground">
            {labels.empty}
          </p>
        )}
      </div>
    </div>
  );
}
