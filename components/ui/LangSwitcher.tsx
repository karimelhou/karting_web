'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/request';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={locale}
      onValueChange={(value) =>
        startTransition(() => {
          router.replace(pathname, { locale: value as Locale });
        })
      }
      disabled={isPending}
    >
      <SelectTrigger className="w-32" aria-label="Choix de la langue">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((code) => (
          <SelectItem key={code} value={code}>
            {code === 'fr' ? 'Français' : 'English'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
