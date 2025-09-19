# Karting Évasion Rumilly – site vitrine Next.js 14

Refonte complète du site public de Karting Évasion Rumilly avec Next.js 14 (App Router), TypeScript, Tailwind CSS + shadcn/ui et next-intl.

## ⚡️ Caractéristiques principales

- App Router avec internationalisation `fr` / `en` via **next-intl**
- Contenus éditoriaux en **MDX** (pistes, offres, groupes, FAQ, blog)
- Formulaires (billetterie, devis groupes, contact) avec **React Hook Form** + **Zod**
- Stockage démo en **Prisma + SQLite** (leads, réservations, contacts) + seed
- Authentification stub **NextAuth Credentials** pour préparation espace membres
- Composants UI Tailwind + shadcn/ui + animations **Framer Motion**
- SEO : `next-seo`, sitemap, robots.txt, OpenGraph dynamique `/og`
- PWA : manifest + service worker simple (cache pages clés)
- Accessibilité : navigation clavier, focus visibles, skip link, aria labels
- Tests : **Vitest** (unitaires) + **Playwright** (e2e billetterie)
- CI ready : lint, tests, build (workflow GitHub Actions à compléter selon besoin)

## 🏁 Prise en main

```bash
pnpm install
pnpm prisma migrate deploy # ou prisma db push
pnpm prisma db seed
pnpm dev
```

Site accessible sur <http://localhost:3000>. Les routes sont localisées : `/fr/...` (défaut) et `/en/...`.

### Scripts utiles

| Commande | Description |
| --- | --- |
| `pnpm dev` | Lancement local (Next.js) |
| `pnpm build` / `pnpm start` | Build et démarrage production |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm test:e2e` | Playwright (nécessite `pnpm dev` dans un autre terminal) |
| `pnpm seed` | Seed Prisma |

## 📂 Structure

```
app/
  [locale]/(site)/...  → pages publiques
  api/                  → routes API (leads, contact, reservations, auth)
components/             → UI, formulaires, providers (i18n, PWA)
content/                → MDX éditables (pistes, offres, groupes, blog, FAQ)
lib/                    → utilitaires, prisma, schemas Zod, pricing, météo
messages/               → catalogues de traduction fr/en
prisma/                 → schema + seed SQLite
public/                 → assets, manifest, service worker
styles/globals.css      → Tailwind + thèmes
```

## ✏️ Modifier le contenu

- **Textes et offres** : fichiers `.mdx` dans `content/`. Chaque fichier possède un front-matter (`title`, `excerpt`, etc.).
- **FAQ** : `content/faq.mdx` (front-matter `faq` pour microdonnées Schema.org).
- **Blog** : ajouter un fichier `.mdx` dans `content/blog/` (`slug.mdx`).
- **Traductions UI** : `messages/fr.json` et `messages/en.json`.
- **Images/vidéos** : placer les médias optimisés dans `public/img` ou `public/video` puis mettre à jour les chemins dans le contenu.

## 🔐 Variables d’environnement

Voir `.env.example` puis créer un `.env.local` :

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
DATABASE_URL=file:./dev.db
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
```

## 🚀 Déploiement

### Vercel

1. Créer un projet Vercel
2. Définir les variables d’environnement ci-dessus
3. Déployer (Next.js 14 supporté nativement)

### Docker

```
docker build -t karting-evasion .
docker run -p 3000:3000 karting-evasion
```

Préciser le volume si vous souhaitez persister la base SQLite (`/app/prisma/dev.db`).

## ✅ Qualité & tests

- ESLint + Prettier (husky `pre-commit` via `pnpm lint-staged`)
- Vitest (`tests/unit`) pour pricing & schémas Zod
- Playwright (`tests/e2e/billetterie.spec.ts`) vérifie le parcours de réservation

## 📌 À personnaliser avant mise en production

- Contenus réels (textes, tarifs, images, vidéos)
- Règlementations (RGPD, CGV, mentions légales)
- Intégration paiement / billetterie live
- Modules analytics (GA ID) après consentement
- Assets haute résolution pour OG / manifest / icônes

Bon run ! 🏎️
