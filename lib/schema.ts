export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Karting Évasion Rumilly',
    url: 'https://karting-evasion.example',
    logo: '/icons/icon-512.svg',
    sameAs: [
      'https://www.facebook.com/karting.evasion.rumilly',
      'https://www.instagram.com/kartingevasion',
      'https://www.youtube.com/@kartingevasion',
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Karting Évasion Rumilly',
    image: [
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Karting_Lehner_2009.jpg',
    ],
    telephone: '+33 4 50 64 62 90',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Les Pérouses',
      postalCode: '74150',
      addressLocality: 'Rumilly',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.8469,
      longitude: 5.9403,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    acceptsReservations: true,
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
