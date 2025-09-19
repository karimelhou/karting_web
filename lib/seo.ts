import type { Metadata, Viewport } from 'next';
import type { NextSeoProps } from 'next-seo';

import { getSiteUrl } from './utils';

const siteUrl = getSiteUrl();

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Karting Évasion Rumilly',
    template: '%s | Karting Évasion Rumilly',
  },
  description:
    'Karting Évasion Rumilly : deux pistes outdoor, formules Grand Prix, école de pilotage, restaurant Pub Le Melbourne et événements sur mesure.',
  keywords: [
    'karting rumilly',
    'karting annecy',
    'grand prix karting',
    'karting haute-savoie',
    'pub le melbourne',
  ],
  authors: [{ name: 'Karting Évasion Rumilly' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    title: 'Karting Évasion Rumilly',
    description:
      "Deux pistes outdoor, formules Grand Prix, école de pilotage, restaurant Pub Le Melbourne et événements d'entreprise.",
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      fr: `${siteUrl}/fr`,
      en: `${siteUrl}/en`,
    },
  },
};

export const defaultViewport: Viewport = {
  themeColor: '#0ea5ff',
};

export const defaultNextSeo: NextSeoProps = {
  titleTemplate: '%s | Karting Évasion Rumilly',
  openGraph: {
    site_name: 'Karting Évasion Rumilly',
  },
  twitter: {
    handle: '@kartingevasion',
    site: '@kartingevasion',
    cardType: 'summary_large_image',
  },
};

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = path ? `${siteUrl}${path}` : siteUrl;
  return {
    ...defaultMetadata,
    title: `${title} | Karting Évasion Rumilly`,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}
