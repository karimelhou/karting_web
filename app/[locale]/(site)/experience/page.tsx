import { getTranslations } from 'next-intl/server';

import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { loadCollection, loadMDXFile } from '@/lib/mdx';
import { faqSchema } from '@/lib/schema';

const benefits = [
  {
    title: 'Pourquoi venir ? – sensations premium',
    points: [
      'Deux pistes outdoor complémentaires, homologuées FFSA, éclairées de nuit.',
      'Chronométrage live, podium, application mobile et modules de gamification.',
      'Staff bilingue, accueil premium et scénarisation des événements.',
    ],
  },
  {
    title: 'Pour qui ?',
    points: [
      'Enfants dès 3 ans en bi-place, 7 ans en mini-kart, 11 ans sur 550 m, 14 ans sur 1150 m.',
      'Familles, passionnés, clubs auto/moto et entreprises jusqu’à 500 personnes.',
      'EVG/EVJF, anniversaires enfants, afterworks, incentives, arbres de Noël.',
    ],
  },
  {
    title: 'Sécurité & coaching',
    points: [
      'Briefings vidéo multilingues, équipements fournis, double freinage sur bi-place.',
      'Encadrement moniteurs diplômés, drapeaux lumineux et suivi piste via caméras.',
      'Plan de gestion météo avec procédure de report sans frais.',
    ],
  },
  {
    title: 'Équipements',
    points: [
      'Parc de 80 karts 270cc & 390cc, karts bi-place, mini-karts électriques.',
      'Paddock couvert, salle briefing 80 places, vestiaires, consignes sécurisées.',
      'Pub Le Melbourne, terrasse panoramique, écrans géants et sonorisation.',
    ],
  },
  {
    title: '+ de Karting Évasion',
    points: [
      'Billetterie digitale, bons cadeaux, badges ANCV et espace membres (en cours).',
      'Coaching chrono, simulateur, escape game mobile et soirées thématiques.',
      'Partenariats locaux : hébergements, transport, production vidéo.',
    ],
  },
];

export default async function ExperiencePage({ params }: { params: { locale: string } }) {
  await getTranslations({ locale: params.locale });
  const tracks = await loadCollection('tracks');
  const faq = await loadMDXFile('faq');
  const faqItems = (faq.frontmatter.faq ?? []) as Array<{
    question: string;
    answer: string;
  }>;
  const schema = faqSchema(faqItems);

  return (
    <div className="container-grid space-y-12 pb-20">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>
      <header className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Expérience</p>
        <h1 className="section-heading">Pourquoi choisir Karting Évasion Rumilly ?</h1>
        <p className="text-muted-foreground">
          Un complexe karting premium mêlant sensations motorsport et accueil familial, à
          20 minutes d’Annecy et Aix-les-Bains. Deux pistes, une équipe d’experts et des
          services sur-mesure.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-lg"
          >
            <h2 className="text-xl font-heading text-foreground">{benefit.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {benefit.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
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
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="section-heading">FAQ & informations pratiques</h2>
          <p className="text-sm text-muted-foreground">
            Retrouvez les réponses aux questions les plus fréquentes. À mettre à jour
            selon vos procédures internes.
          </p>
        </div>
        <FaqAccordion items={faqItems} />
      </section>
    </div>
  );
}
