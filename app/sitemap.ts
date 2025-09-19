import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/utils';

const routes = [
  '',
  '/experience',
  '/pistes',
  '/offres',
  '/offres/sessions',
  '/offres/grand-prix',
  '/offres/ecole-pilotage',
  '/offres/groupes-entreprises',
  '/billetterie',
  '/galerie',
  '/restaurant',
  '/evenements',
  '/actu',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
  '/cgv',
  '/recrutement',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.flatMap((route) => [
    {
      url: `${siteUrl}/fr${route}`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/en${route}`,
      lastModified: new Date(),
    },
  ]);
}
