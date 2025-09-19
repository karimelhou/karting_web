import { ReservationWizard } from '@/components/ui/ReservationWizard';

export default function BilletteriePage() {
  return (
    <div className="container-grid space-y-10 pb-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Billetterie</p>
        <h1 className="section-heading">Réservez votre session karting</h1>
        <p className="text-muted-foreground">
          Choisissez un créneau, le nombre de participants et obtenez une estimation
          instantanée. Paiement sur place ou acompte en ligne (module à intégrer).
        </p>
      </header>
      <ReservationWizard />
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted-foreground">
        <h2 className="text-lg font-heading text-foreground">Infos pratiques</h2>
        <ul className="mt-3 space-y-2">
          <li>Arriver 30 minutes avant le départ pour briefing et équipement.</li>
          <li>Tenue couvrante obligatoire, chaussures fermées.</li>
          <li>
            Licence journée disponible, possibilité de privatisation hors horaires
            publics.
          </li>
        </ul>
      </section>
    </div>
  );
}
