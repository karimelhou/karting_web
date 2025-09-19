import { getTranslations } from 'next-intl/server';

import { GroupQuote } from '@/components/ui/GroupQuote';
import { HeroVideo } from '@/components/ui/HeroVideo';
import { LightboxGallery } from '@/components/ui/Lightbox';
import { ReservationWizard } from '@/components/ui/ReservationWizard';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { TrackStatus } from '@/components/ui/TrackStatus';
import { GALLERY_IMAGES } from '@/lib/constants';
import { Link } from '@/lib/i18n/navigation';
import { formatTime, leaderboardData } from '@/lib/leaderboard';
import { loadCollection } from '@/lib/mdx';
import { localBusinessSchema, organizationSchema } from '@/lib/schema';
import { formatCurrency } from '@/lib/utils';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  const pricing = await loadCollection('pricing');
  const galleryItems = GALLERY_IMAGES;

  const schema = [organizationSchema(), localBusinessSchema()];

  return (
    <div className="container-grid space-y-20 pb-20">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>
      <HeroVideo />
      <TrackStatus />
      <section className="grid gap-8 md:grid-cols-3">
        {(t.raw('tiles') as Array<{ title: string; description: string }>).map((tile) => (
          <div
            key={tile.title}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg"
          >
            <h3 className="text-xl font-heading text-foreground">{tile.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tile.description}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            Offres & tarifs
          </p>
          <h2 className="section-heading">Choisissez votre format de course</h2>
          <p className="text-muted-foreground">
            Sessions libre-service, formules Grand Prix ou endurance sur devis : tout est
            prêt pour faire vibrer vos équipes, votre famille ou vos clients.
          </p>
          <div className="space-y-4">
            {pricing.map((item) => (
              <div
                key={item.slug}
                className="rounded-2xl border border-white/10 bg-surface/70 p-5"
              >
                <h3 className="text-lg font-heading text-foreground">
                  {item.frontmatter.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.frontmatter.excerpt}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/offres"
            className="text-sm font-semibold text-primary hover:text-primary/80"
          >
            {t('heroCtas.secondary')} →
          </Link>
        </div>
        <ReservationWizard />
      </section>
      <GroupQuote />
      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="section-heading">{t('testimonialTitle')}</h2>
          <p className="mt-3 text-muted-foreground">
            Expérience premium, accueil personnalisé et sensations garanties.
          </p>
          <TestimonialCarousel />
        </div>
        <div>
          <h3 className="section-heading text-2xl">Leaderboard démo</h3>
          <p className="text-sm text-muted-foreground">{t('partners')}</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-black/40 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">{t('leaderboard.track')}</th>
                  <th className="px-4 py-3">{t('leaderboard.driver')}</th>
                  <th className="px-4 py-3">{t('leaderboard.bestTime')}</th>
                  <th className="px-4 py-3">{t('leaderboard.date')}</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr
                    key={`${entry.driver}-${entry.date}`}
                    className="border-t border-white/10"
                  >
                    <td className="px-4 py-3 text-foreground">{entry.track}</td>
                    <td className="px-4 py-3">{entry.driver}</td>
                    <td className="px-4 py-3">{formatTime(entry.bestTime)}</td>
                    <td className="px-4 py-3">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section>
        <h2 className="section-heading">Galerie immersive</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Photos et vidéos à actualiser selon vos campagnes.
        </p>
        <LightboxGallery items={galleryItems} />
      </section>
      <section className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4">
          <h2 className="section-heading">Pub Le Melbourne</h2>
          <p className="text-muted-foreground">
            Ambiance F1 x street art, billard, fléchettes, écrans géants et carte
            modulable. Horaires indicatifs 7/7 (à ajuster).
          </p>
          <Link href="/restaurant" className="text-sm font-semibold text-primary">
            {t('melbourne.cta')} →
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-muted-foreground">
          <p className="text-lg font-heading text-foreground">
            Tarifs Grand Prix (exemples)
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              Mini GP : {formatCurrency(93)} / pers • essais 10 min + qualif 10 min +
              course 10 min
            </li>
            <li>
              Grand Prix : {formatCurrency(126)} / pers • essais 15 min + qualif 15 min +
              course 15 min
            </li>
            <li>Maxi GP : {formatCurrency(140)} / pers • format pré-finale + finale</li>
            <li>Endurance : sur devis</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
