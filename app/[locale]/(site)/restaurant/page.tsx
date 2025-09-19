import { Link } from '@/lib/i18n/navigation';

export default function RestaurantPage() {
  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
          Pub Le Melbourne
        </p>
        <h1 className="section-heading">Ambiance F1 x street art</h1>
        <p className="text-muted-foreground">
          7/7, carte burgers & tapas, cocktails signature, retransmissions de Grand Prix,
          billard et fléchettes.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-xl font-heading text-foreground">
            Horaires indicatifs (à ajuster)
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Lundi-jeudi : 11h30 – 23h</li>
            <li>Vendredi-samedi : 11h – 01h</li>
            <li>Dimanche : 11h – 22h</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground/70">
            Modifier ces horaires selon la saison.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-xl font-heading text-foreground">Privatisation</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Salle privative, DJ, animation quizz F1, accords mets & cocktails. Demandez un
            devis via le formulaire de contact ou le module groupes.
          </p>
          <Link
            href="/offres/groupes-entreprises"
            className="mt-4 inline-block text-sm font-semibold text-primary"
          >
            Voir les offres groupes →
          </Link>
        </div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted-foreground">
        <h2 className="text-lg font-heading text-foreground">Menu PDF</h2>
        <p className="mt-2">Intégrez ici un lien vers votre carte. Placeholder :</p>
        <Link href="#" className="text-primary">
          Télécharger la carte (PDF)
        </Link>
      </section>
    </div>
  );
}
