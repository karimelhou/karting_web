import { getTranslations } from 'next-intl/server';

import { loadCollection } from '@/lib/mdx';

export default async function TracksPage({ params }: { params: { locale: string } }) {
  await getTranslations({ locale: params.locale });
  const tracks = await loadCollection('tracks');

  return (
    <div className="container-grid space-y-12 pb-20">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Pistes</p>
        <h1 className="section-heading">Deux circuits complémentaires</h1>
        <p className="text-muted-foreground">
          550 m technique pour progresser, 1150 m rapide pour la compétition. Les deux
          pistes peuvent fonctionner simultanément.
        </p>
      </header>
      <div className="space-y-10">
        {tracks.map((track) => (
          <article
            key={track.slug}
            className="rounded-3xl border border-white/10 bg-surface/70 p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-heading text-foreground">
              {track.frontmatter.title}
            </h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              {track.content}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
