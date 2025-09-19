import { formatCurrency } from '@/lib/utils';

type PricingTier = {
  name: string;
  price: number | null;
  description: string;
  details: string[];
  footnote?: string;
};

const grandPrixTiers: PricingTier[] = [
  {
    name: 'Mini Grand Prix',
    price: 93,
    description: '10’ essais • 10’ qualif • 10’ course',
    details: ['À partir de 15 personnes', 'Chronométrage + podium inclus'],
  },
  {
    name: 'Grand Prix',
    price: 126,
    description: '15’ essais • 15’ qualif • 15’ course',
    details: ['Briefing premium', 'Podium + médailles', 'Options restauration'],
  },
  {
    name: 'Maxi Grand Prix',
    price: 140,
    description: '10’ essais • 10’ qualif • 15’ pré-finale • 15’ finale',
    details: ['≥ 15 personnes', 'Deux finales avec grille inversée'],
  },
  {
    name: 'Endurance',
    price: null,
    description: 'Relais 2 à 4 pilotes jusqu’à 2h',
    details: ['Briefing speaker', 'Podium & trophées'],
    footnote: 'Sur devis',
  },
];

export function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {grandPrixTiers.map((tier) => (
        <article
          key={tier.name}
          className="flex flex-col rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg"
        >
          <h2 className="text-xl font-heading text-foreground">{tier.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
          <p className="mt-4 text-2xl font-semibold text-primary">
            {tier.price ? `${formatCurrency(tier.price)} / pers` : tier.footnote}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {tier.details.map((detail) => (
              <li key={detail}>• {detail}</li>
            ))}
          </ul>
          <p className="mt-auto pt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            ≥15 pers – modulable selon disponibilité
          </p>
        </article>
      ))}
    </div>
  );
}
