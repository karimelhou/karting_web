import { getTranslations } from 'next-intl/server';

import { loadCollection } from '@/lib/mdx';

export default async function ExperiencePage({ params }: { params: { locale: string } }) {
  await getTranslations({ locale: params.locale });
  const tracks = await loadCollection('tracks');

  return (
    <div className="container-grid space-y-12 pb-20">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Expérience</p>
        <h1 className="section-heading">Pourquoi choisir Karting Évasion Rumilly ?</h1>
        <p className="text-muted-foreground">
          Deux pistes complémentaires, une équipe encadrante FFSA et une offre clé en main
          pour les familles comme pour les entreprises.
        </p>
      </header>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-2xl font-heading text-foreground">Sécurité & pédagogie</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              Briefings multilingues, vidéos pédagogiques et simulateur de freinage.
            </li>
            <li>Équipements inclus, contrôle des pressions et assistance piste.</li>
            <li>
              École de pilotage : stages enfants, coaching chronométré, journées VIP.
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-2xl font-heading text-foreground">Pour qui ?</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Enfants dès 3 ans en bi-place, 7 ans en mini-kart.</li>
            <li>Ados et adultes, sessions loisirs ou coaching.</li>
            <li>Groupes privés, incentives, séminaires, nocturnes.</li>
          </ul>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="section-heading">Nos pistes complémentaires</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map((track) => (
            <article
              key={track.slug}
              className="rounded-3xl border border-white/10 bg-surface/60 p-6 shadow-lg"
            >
              <h3 className="text-xl font-heading text-foreground">
                {track.frontmatter.title}
              </h3>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                {track.content}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
