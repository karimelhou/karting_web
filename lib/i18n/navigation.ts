import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { defaultLocale, locales } from './request';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
    defaultLocale,
  },
);
