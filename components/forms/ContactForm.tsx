'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { contactSchema } from '@/lib/schemas';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
    },
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Nom</FormLabel>
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
                <FormLabel htmlFor={field.name}>Email</FormLabel>
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
                <FormLabel htmlFor={field.name}>Téléphone</FormLabel>
                <FormControl>
                  <Input id={field.name} type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
        </div>
        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Message</FormLabel>
              <FormControl>
                <Textarea id={field.name} {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4">
              <div>
                <FormLabel htmlFor={field.name}>RGPD</FormLabel>
                <p className="text-xs text-muted-foreground">
                  J’accepte que mes données soient traitées pour recevoir une réponse.
                </p>
              </div>
              <FormControl>
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi...' : 'Envoyer'}
        </Button>
        {status === 'success' && (
          <p className="text-sm text-primary" role="status">
            Message envoyé, merci !
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400" role="alert">
            Une erreur est survenue.
          </p>
        )}
      </form>
    </Form>
  );
}
