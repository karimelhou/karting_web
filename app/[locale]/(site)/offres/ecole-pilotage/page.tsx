export default function EcolePilotagePage() {
  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
          École de pilotage
        </p>
        <h1 className="section-heading">Progression encadrée toute l’année</h1>
        <p className="text-muted-foreground">
          Stages vacances, coaching individuel, carnet de progression numérique et
          simulateur embarqué.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-xl font-heading text-foreground">Stages Kids & Juniors</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Dès 7 ans, journées complètes avec ateliers théorie + pratique.</li>
            <li>Chronos suivis, coaching vidéo, remise d’un passeport pilote.</li>
            <li>Calendrier vacances scolaires – réservation par email.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-xl font-heading text-foreground">Coaching adulte</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Sessions 1:1 avec data logger, analyse trajectoire.</li>
            <li>Packages chrono 5 × 15 min – progression garantie.</li>
            <li>Préparation compétition Rotax & X30.</li>
          </ul>
        </div>
      </section>
      <p className="text-xs text-muted-foreground">
        Contact : ecoledespilotes@karting-evasion.example — calendrier personnalisable.
      </p>
    </div>
  );
}
