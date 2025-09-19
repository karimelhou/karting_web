export type EventItem = {
  slug: string;
  title: string;
  date: string;
  track: '550m' | '1150m';
  category: 'famille' | 'competition' | 'entreprise';
  description: string;
};

export const upcomingEvents: EventItem[] = [
  {
    slug: 'stage-jeunes-printemps',
    title: 'Stage jeunes pilotes – vacances de printemps',
    date: '2024-04-22',
    track: '550m',
    category: 'famille',
    description:
      'Journée complète avec coaching personnalisé, kart adaptés 270cc et ateliers sécurité.',
  },
  {
    slug: 'nocturne-grand-prix',
    title: 'Nocturne Grand Prix – format Maxi GP',
    date: '2024-05-18',
    track: '1150m',
    category: 'competition',
    description:
      'Briefing premium, essais chronométrés et finale sous projecteurs, podium inclus.',
  },
  {
    slug: 'afterwork-teambuilding',
    title: 'Afterwork entreprises – challenge mixte',
    date: '2024-06-06',
    track: '1150m',
    category: 'entreprise',
    description:
      'Sessions en relais, animation animateur, cocktail dinatoire au Pub Le Melbourne.',
  },
];
