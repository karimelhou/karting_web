import { upcomingEvents } from '@/lib/events';

const filters = [
  { label: 'Toutes les pistes', value: 'all' },
  { label: '550 m', value: '550m' },
  { label: '1150 m', value: '1150m' },
];

export default function EvenementsPage() {
  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Événements</p>
        <h1 className="section-heading">Agenda à venir</h1>
        <p className="text-muted-foreground">
          Adaptez cette section avec votre calendrier réel : stages, nocturnes,
          afterworks.
        </p>
      </header>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {filters.map((filter) => (
          <span
            key={filter.value}
            className="rounded-full border border-white/10 px-4 py-2"
          >
            {filter.label}
          </span>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {upcomingEvents.map((event) => (
          <article
            key={event.slug}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              {event.track}
            </p>
            <h2 className="mt-2 text-xl font-heading text-foreground">{event.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
            <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
