import { getTranslations } from 'next-intl/server';

import { LightboxGallery } from '@/components/ui/Lightbox';
import { TrackDiagram } from '@/components/ui/TrackDiagram';
import { GALLERY_IMAGES, TRACKS } from '@/lib/constants';
import { Link } from '@/lib/i18n/navigation';
import { loadCollection } from '@/lib/mdx';

const trackTips: Record<string, string[]> = {
  '550m': [
    'Idéal pour progresser sur les freinages tardifs et l’enchaînement de virages serrés.',
    'Pensez à élargir à l’entrée du double droit pour ressortir fort vers la ligne droite.',
    'Briefing spécifique juniors et réglage pédales pour les 11-13 ans.',
  ],
  '1150m': [
    'Tracé rapide avec ligne droite de 180 m : gérez votre aspi avant le freinage du bout droit.',
    'Virage en montée au secteur 2 : restez en appui pour préparer la relance.',
    'Recommandé pour les formats Grand Prix et endurance corporate.',
  ],
};

export default async function TracksPage({ params }: { params: { locale: string } }) {
  await getTranslations({ locale: params.locale });
  const tracks = await loadCollection('tracks');
  const gallery = GALLERY_IMAGES.slice(0, 4);

  return (
    <div className="container-grid space-y-12 pb-20">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Pistes</p>
        <h1 className="section-heading">Deux circuits complémentaires</h1>
        <p className="text-muted-foreground">
          550 m technique pour apprendre, 1150 m rapide pour la compétition. Possibilité
          de privatisation simultanée et chrono live.
        </p>
      </header>
      <div className="space-y-10">
        {tracks.map((track) => (
          <article
            key={track.slug}
            className="grid gap-8 rounded-3xl border border-white/10 bg-surface/70 p-8 shadow-2xl lg:grid-cols-[1.3fr_1fr]"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-heading text-foreground">
                {track.frontmatter.title}
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                {track.content}
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {trackTips[track.slug]?.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                <span>Homologation FFSA</span>
                <span>Surface asphaltée</span>
                <span>Chronométrage LiveTiming</span>
              </div>
              <Link
                href="/billetterie"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Voir disponibilités →
              </Link>
            </div>
            <div className="space-y-4">
              <TrackDiagram track={track.slug as '550m' | '1150m'} />
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Infos clés</p>
                {TRACKS.filter((item) => item.slug === track.slug).map((item) => (
                  <ul key={item.slug} className="mt-2 space-y-1">
                    <li>Longueur : {item.length}</li>
                    <li>Points forts : {item.highlight}</li>
                    <li>Niveau conseillé : {item.difficulty}</li>
                    <li>Âge minimum : {item.minAge}</li>
                  </ul>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="space-y-4">
        <h2 className="section-heading">Dans l’ambiance des pistes</h2>
        <p className="text-sm text-muted-foreground">
          Sélection de visuels à mettre à jour selon vos campagnes photo/vidéo.
        </p>
        <LightboxGallery items={gallery} />
      </section>
    </div>
  );
}
