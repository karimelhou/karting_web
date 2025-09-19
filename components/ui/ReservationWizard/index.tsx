'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { computeReservationEstimate, packageLabels } from '@/lib/pricing';
import { reservationSchema } from '@/lib/schemas';

import { Button } from '../button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Input } from '../input';
import { Progress } from '../progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Switch } from '../switch';

const steps = ['when', 'who', 'what', 'review'] as const;

export function ReservationWizard() {
  const t = useTranslations();
  const stepLabels = steps.map((step) =>
    t(`reservation.steps.${step}` as Parameters<typeof t>[0]),
  );
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: '',
      time: '',
      packageKey: 'session',
      restaurant: false,
      adults: 1,
      teens: 0,
      kids: 0,
      email: '',
      phone: '',
      name: '',
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const prefersReducedMotion = useReducedMotion();

  const values = form.watch();
  const estimate = computeReservationEstimate({
    packageKey: values.packageKey,
    participants: {
      adults: Number(values.adults || 0),
      teens: Number(values.teens || 0),
      kids: Number(values.kids || 0),
    },
    restaurant: values.restaurant,
  });

  const handleNext = async () => {
    const fieldsToValidate = [
      ['date', 'time'],
      ['adults', 'teens', 'kids', 'name', 'email', 'phone'],
      ['packageKey', 'restaurant'],
    ];

    if (activeStep < steps.length - 1) {
      const fields = fieldsToValidate[activeStep];
      if (!fields) {
        setActiveStep((prev) => prev + 1);
        return;
      }
      const valid = await form.trigger(
        fields as (keyof z.infer<typeof reservationSchema>)[],
      );
      if (valid) {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: z.infer<typeof reservationSchema>) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, total: estimate.total }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setStatus('success');
      form.reset();
      setActiveStep(0);
    } catch (error) {
      setStatus('error');
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section
      id="reservation"
      className="rounded-3xl border border-white/10 bg-surface/90 p-8 shadow-2xl"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            {t('reservation.subtitle')}
          </p>
          <h2 className="text-3xl font-heading text-foreground">
            {t('reservation.title')}
          </h2>
        </div>
        <Progress value={progress} />
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t('reservation.progressLabel', {
            current: activeStep + 1,
            total: steps.length,
            step: stepLabels[activeStep],
          })}
        </p>
      </div>
      <Form {...form}>
        <form className="mt-8 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div
            key={activeStep}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {activeStep === 0 && (
              <>
                <FormField
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.date')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.time')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <FormField
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.adults')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="teens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.teens')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="kids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.kids')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.name')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.email')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>{t('forms.phone')}</FormLabel>
                      <FormControl>
                        <Input id={field.name} type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {activeStep === 2 && (
              <>
                <FormField
                  name="packageKey"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel htmlFor={field.name}>{t('forms.package')}</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id={field.name}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(packageLabels).map(([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 md:col-span-2">
                      <FormLabel
                        htmlFor={field.name}
                        className="text-base text-foreground"
                      >
                        {t('forms.restaurantAddon')} (+18€ / pers)
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-3">
                          <Switch
                            id={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm text-muted-foreground">
                            Option restaurant Pub Le Melbourne
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {activeStep === 3 && (
              <div className="md:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <h3 className="text-xl font-heading text-foreground">
                    {t('forms.estimate')}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li>
                      <span className="text-foreground">{t('forms.participants')}:</span>{' '}
                      {estimate.totalParticipants}
                    </li>
                    <li>
                      <span className="text-foreground">Formule:</span>{' '}
                      {packageLabels[values.packageKey]}
                    </li>
                    <li>
                      <span className="text-foreground">Tarif / pers:</span>{' '}
                      {estimate.packagePrice}€
                    </li>
                    <li>
                      <span className="text-foreground">Option restaurant:</span>{' '}
                      {values.restaurant ? 'Oui' : 'Non'}
                    </li>
                  </ul>
                  <p className="mt-4 text-lg font-semibold text-foreground">
                    {t('forms.total')}: {estimate.total}€
                  </p>
                </div>
              </div>
            )}
          </motion.div>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              {activeStep > 0 && (
                <Button type="button" variant="secondary" onClick={handlePrev}>
                  {t('forms.back')}
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button type="button" onClick={handleNext}>
                  {t('forms.next')}
                </Button>
              )}
            </div>
            {activeStep === steps.length - 1 && (
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? t('common.loading') : t('forms.submit')}
              </Button>
            )}
          </div>
          {status === 'success' && (
            <p
              className="rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary"
              role="status"
            >
              {t('forms.successWizard')}
            </p>
          )}
          {status === 'error' && (
            <p
              className="rounded-xl border border-red-400 bg-red-500/10 p-4 text-sm text-red-300"
              role="alert"
            >
              {t('common.error')}
            </p>
          )}
        </form>
      </Form>
    </section>
  );
}
