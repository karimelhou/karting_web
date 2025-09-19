'use client';

import { useTranslations } from 'next-intl';

import { CONTACT, PARTNERS } from '@/lib/constants';
import { Link } from '@/lib/i18n/navigation';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/60 py-12 text-sm text-muted-foreground">
      <div className="container-grid grid gap-10 lg:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-heading text-foreground">
              Karting Évasion Rumilly
            </h3>
            <p>{t('footer.address')}</p>
            <p>
              {t('footer.phone')} •{' '}
              <Link href={`tel:${CONTACT.phone}`} className="text-primary">
                {CONTACT.formattedPhone}
              </Link>
            </p>
            <p>{t('footer.hours')}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              {t('common.membersArea')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-primary/80">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-primary/40 px-3 py-1"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground uppercase">
            {t('navigation.offers')}
          </h4>
          <ul className="space-y-1">
            <li>
              <Link href="/offres/sessions" className="hover:text-primary">
                {t('navigation.sessions')}
              </Link>
            </li>
            <li>
              <Link href="/offres/grand-prix" className="hover:text-primary">
                {t('navigation.grandPrix')}
              </Link>
            </li>
            <li>
              <Link href="/offres/ecole-pilotage" className="hover:text-primary">
                {t('navigation.drivingSchool')}
              </Link>
            </li>
            <li>
              <Link href="/offres/groupes-entreprises" className="hover:text-primary">
                {t('navigation.groups')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground uppercase">
            {t('navigation.contact')}
          </h4>
          <ul className="space-y-1">
            <li>
              <Link href="/mentions-legales" className="hover:text-primary">
                {t('navigation.legal')}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-primary">
                {t('navigation.privacy')}
              </Link>
            </li>
            <li>
              <Link href="/cgv" className="hover:text-primary">
                {t('navigation.terms')}
              </Link>
            </li>
            <li>
              <Link href="/recrutement" className="hover:text-primary">
                {t('navigation.jobs')}
              </Link>
            </li>
          </ul>
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p>{t('navigation.app')}</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl border border-white/20 px-4 py-2 text-left text-xs text-foreground hover:border-primary"
              >
                iOS
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/20 px-4 py-2 text-left text-xs text-foreground hover:border-primary"
              >
                Android
              </button>
            </div>
            <p>{t('navigation.gifts')}</p>
          </div>
        </div>
      </div>
      <div className="container-grid mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Karting Évasion Rumilly. Tous droits réservés.
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70">
          {t('common.ancv')} • {t('common.ffsa')}
        </p>
      </div>
    </footer>
  );
}
