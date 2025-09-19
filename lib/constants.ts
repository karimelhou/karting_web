export const CONTACT = {
  phone: '+33 (0)4 50 64 62 90',
  formattedPhone: '04 50 64 62 90',
  email: 'contact@karting-evasion.example',
  address: 'Les Pérouses, 74150 Rumilly',
  city: 'Rumilly',
  lat: 45.8469,
  lng: 5.9403,
};

export const TRACK_STATUS = {
  state: 'open' as 'open' | 'closed' | 'weather',
  message: 'Ouvert - conditions idéales',
  nextSlot: 'Prochain départ à 14h30',
  updatedAt: 'Mise à jour 30 min',
};

export const TRACKS = [
  {
    slug: '550m',
    title: '550 m – technique & fun',
    length: '550 m',
    highlight: 'Trajectoires serrées et relances dynamiques',
    difficulty: 'Intermédiaire',
    minAge: '11 ans',
    homologation: true,
  },
  {
    slug: '1150m',
    title: '1150 m – vitesse & compétition',
    length: '1150 m',
    highlight: 'Ligne droite de 180 m et virages haute vitesse',
    difficulty: 'Avancé',
    minAge: '14 ans',
    homologation: true,
  },
];

export const PARTNERS = [
  'FFSA',
  'ANCV',
  'Bridgestone',
  'Savoie Mont Blanc',
  'Le Melbourne',
];

export const GALLERY_IMAGES = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Karting_Lehner_2009.jpg',
    alt: 'Grille de départ karting extérieur',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Rotax_max_kart.jpg',
    alt: 'Pilote au freinage tardif',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Go_Kart_Driver.jpg',
    alt: 'Briefing sécurité jeunes pilotes',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Indoor_karting.jpg',
    alt: 'Ambiance lounge après-course',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Go-kart_race_in_Bristol.jpg',
    alt: 'Podium nocturne Grand Prix',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Karting_Near_BeiChen_2012.jpg',
    alt: 'Team building karting entreprises',
  },
];
