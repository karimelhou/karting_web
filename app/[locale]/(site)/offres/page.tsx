import { Link } from '@/lib/i18n/navigation';

const offers = [
  {
    href: '/offres/sessions',
    title: 'Sessions solo & famille',
    description: 'Roulez en liberté, dès 3 ans en bi-place et dès 11 ans en kart junior.',
  },
  {
    href: '/offres/grand-prix',
    title: 'Formules Grand Prix',
    description: 'Mini GP, GP, Maxi GP — classements live, podium et options premium.',
  },
  {
    href: '/offres/ecole-pilotage',
    title: 'École de pilotage',
    description: 'Stages kids & ados, coaching chrono, calendrier vacances scolaires.',
  },
  {
    href: '/offres/groupes-entreprises',
    title: 'Groupes & entreprises',
    description: 'Team building, séminaires, EVG/EVJF, arbres de Noël sur mesure.',
  },
];

export default function OffersPage() {
  return (
    <div className="container-grid space-y-10 pb-20">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Offres</p>
        <h1 className="section-heading">Toutes nos formules karting</h1>
        <p className="text-muted-foreground">
          Découvrez nos sessions loisirs, packs Grand Prix, école de pilotage et solutions
          entreprise.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {offers.map((offer) => (
          <Link
            key={offer.href}
            href={offer.href}
            className="rounded-3xl border border-white/10 bg-surface/70 p-6 shadow-lg transition hover:border-primary/50"
          >
            <h2 className="text-xl font-heading text-foreground">{offer.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-primary">
              Explorer →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
