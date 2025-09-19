'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { htmlFor: string }
>(({ className, htmlFor, ...props }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={cn('text-sm font-medium text-muted-foreground', className)}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };
