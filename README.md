# Karting Évasion Rumilly – Site vitrine nouvelle génération

Refonte complète du site public de Karting Évasion Rumilly pensée pour la conversion, l’accessibilité et la performance.

## ⚙️ Stack retenue & justification rapide
- **Framework : Next.js 14 (App Router) + TypeScript** — rendu hybride (SSG/SSR) parfait pour le SEO, excellent DX, internationalisation native et PWA.
- **Styling : Tailwind CSS + composants headless (shadcn/ui)** — design system rapide à faire évoluer, focus accessibilité, thèmes sombres clairs.
- **Contenus : MDX + fichiers structurés (`content/*`)** — édition simple hors CMS, versionnable.
- **Formulaires : React Hook Form + Zod** — validation typée côté client et API, conformité RGPD.
- **Tests : Vitest (unit) & Playwright (e2e)** — couverture business critique (pricing, formulaires, wizard).
- **Build : pnpm + Turbopack/Next build**, déploiement cible **Vercel** ou **Docker**.

## 🚀 Prise en main
```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Production :
```bash
pnpm build
pnpm start
```

### Autres scripts
| Commande | Description |
| --- | --- |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |
| `pnpm test:unit` | Vitest (pricing, schémas) |
| `pnpm test:e2e` | Playwright (lance automatiquement `pnpm dev`) |
| `pnpm type-check` | Vérification TypeScript |
| `pnpm seed` | Données de démo Prisma (optionnel) |

## 📁 Structure principale
```
app/
  [locale]/(site)/…   Pages publiques (Accueil, Expérience, Offres, etc.)
  api/                Routes API (contact, leads, reservations)
components/           UI (Nav, Footer, Wizard, TrackStatus, etc.)
content/              Contenus éditoriaux MDX (pistes, offres, groupes, blog, FAQ)
lib/                  Utilitaires (pricing, météo mock, schema.org, i18n)
messages/             Traductions FR / EN
public/               Assets, manifest, service worker, icônes
tests/               Vitest + Playwright
.github/workflows/    Pipeline CI (lint, tests, build)
```

## ✏️ Modifier le contenu
- **Pistes** : `content/tracks/550m.mdx`, `content/tracks/1150m.mdx`
- **Offres & tarifs** : `content/pricing/*.mdx`
- **Groupes / entreprises** : `content/groups/*.mdx`
- **FAQ** : `content/faq.mdx` (front-matter `faq` pour Schema.org)
- **Actualités** : `content/blog/*.mdx` (slug = nom de fichier)
- **Traductions UI** : `messages/fr.json`, `messages/en.json`

> Toute modification est hot-reloadée en dev. Ajouter vos visuels optimisés dans `public/`.

## 🔐 Variables d’environnement
Copier `.env.example` vers `.env.local` et renseigner :
```
NEXT_PUBLIC_SITE_URL=https://karting-evasion.example
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
NEXTAUTH_SECRET=change-me
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./dev.db
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=mailer@example.com
EMAIL_SERVER_PASSWORD=••••
EMAIL_FROM=Karting <contact@karting-evasion.example>
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
```

## 🧪 Qualité & CI
- **Vitest** vérifie la logique pricing + schémas Zod (`tests/unit`).
- **Playwright** valide le parcours billetterie (réservation wizard).
- Workflow GitHub Actions (`.github/workflows/ci.yml`) : install, lint, tests, build.

## ☁️ Déploiement
### Vercel
1. Créer un projet et connecter le repo.
2. Renseigner les variables d’environnement.
3. Déployer (`pnpm build` est géré automatiquement).

### Docker
```
docker build -t karting-evasion .
docker run -p 3000:3000 --env-file .env.production karting-evasion
```
Monter un volume si vous souhaitez persister la base SQLite (`/app/prisma/dev.db`).

## 🧭 Points d’attention avant prod
- Mettre à jour les tarifs, horaires et contenus (restaurant, événements, FAQ…).
- Fournir les visuels HD, manifest/icons adaptés, vidéos compressées.
- Brancher le mailer réel et sécuriser l’analytics (consentement déjà géré).
- Brancher un véritable back-office pour gérer le statut piste / météo si besoin.

Bonne mise en route ! 🏎️
