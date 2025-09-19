'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { computeGroupQuote } from '@/lib/pricing';
import { groupQuoteSchema } from '@/lib/schemas';

import { Button } from '../button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Input } from '../input';
import { Slider } from '../slider';
import { Switch } from '../switch';

export function GroupQuote() {
  const t = useTranslations();
  const form = useForm<z.infer<typeof groupQuoteSchema>>({
    resolver: zodResolver(groupQuoteSchema),
    defaultValues: {
      company: '',
      participants: 15,
      duration: 90,
      catering: true,
      meetingRoom: false,
      email: '',
      phone: '',
      message: '',
    },
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const values = form.watch();
  const estimate = computeGroupQuote({
    participants: values.participants,
    duration: values.duration,
    catering: values.catering,
    meetingRoom: values.meetingRoom,
  });

  const onSubmit = async (data: z.infer<typeof groupQuoteSchema>) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, estimate }),
      });
      if (!response.ok) {
        throw new Error('Failed');
      }
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
          {t('groups.subtitle')}
        </p>
        <h2 className="text-3xl font-heading text-foreground">{t('groups.title')}</h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-[2fr_1fr]"
        >
          <div className="space-y-6">
            <FormField
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>{t('forms.company')}</FormLabel>
                  <FormControl>
                    <Input id={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>{t('forms.participants')}</FormLabel>
                    <FormControl>
                      <Slider
                        id={field.name}
                        value={[field.value]}
                        min={10}
                        max={80}
                        step={1}
                        onValueChange={([value]) => field.onChange(value)}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {field.value} participants
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>
                      {t('forms.duration')} (minutes)
                    </FormLabel>
                    <FormControl>
                      <Slider
                        id={field.name}
                        value={[field.value]}
                        min={60}
                        max={240}
                        step={30}
                        onValueChange={([value]) => field.onChange(value)}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {field.value} min de roulage
                    </p>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                name="catering"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <FormLabel htmlFor={field.name}>
                      Restauration Pub Le Melbourne
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Switch
                          id={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-sm text-muted-foreground">
                          Cocktail ou repas (à affiner)
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="meetingRoom"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                    <FormLabel htmlFor={field.name}>Salle de séminaire</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Switch
                          id={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span className="text-sm text-muted-foreground">
                          Capacité 40 personnes
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
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
            </div>
            <FormField
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>{t('forms.message')}</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      {...field}
                      placeholder="Brief, attentes spécifiques…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? t('common.loading') : t('groups.cta')}
              </Button>
              {status === 'success' && (
                <motion.span
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-primary"
                >
                  {t('common.success')}
                </motion.span>
              )}
              {status === 'error' && (
                <span role="alert" className="text-sm text-red-400">
                  {t('common.error')}
                </span>
              )}
            </div>
          </div>
          <div
            className="space-y-4 rounded-3xl border border-white/10 bg-surface/60 p-6"
            aria-live="polite"
          >
            <h3 className="text-xl font-heading text-foreground">Estimation</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Location piste: {estimate.trackCost} €</li>
              <li>Restauration: {estimate.cateringCost} €</li>
              <li>Salle séminaire: {estimate.meetingRoomCost} €</li>
            </ul>
            <p className="text-lg font-semibold text-foreground">
              Total estimé: {estimate.total} € HT
            </p>
            <p className="text-xs text-muted-foreground">
              Chiffrage indicatif. Détail personnalisable sur devis final.
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
