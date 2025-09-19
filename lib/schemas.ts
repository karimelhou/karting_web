import { z } from 'zod';

export const reservationSchema = z
  .object({
    date: z.string().min(1, 'Sélectionnez une date'),
    time: z.string().min(1, 'Sélectionnez un créneau'),
    packageKey: z.enum(['session', 'mini', 'grand', 'maxi']),
    restaurant: z.boolean().default(false),
    adults: z.coerce.number().min(0).default(1),
    teens: z.coerce.number().min(0).default(0),
    kids: z.coerce.number().min(0).default(0),
    email: z.string().email('Email invalide'),
    phone: z.string().min(6),
    name: z.string().min(2),
  })
  .refine((values) => values.adults + values.teens + values.kids > 0, {
    message: 'Ajoutez au moins un participant',
    path: ['adults'],
  });

export const groupQuoteSchema = z.object({
  company: z.string().min(2),
  participants: z.coerce.number().min(5),
  duration: z.coerce.number().min(30).max(240),
  catering: z.boolean().default(false),
  meetingRoom: z.boolean().default(false),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().min(10),
  consent: z.boolean().refine((value) => value === true, {
    message: 'Consentement requis',
  }),
});

export const leadSchema = z.object({
  company: z.string(),
  participants: z.number(),
  duration: z.number(),
  catering: z.boolean(),
  meetingRoom: z.boolean(),
  email: z.string(),
  phone: z.string(),
  message: z.string().optional(),
});
