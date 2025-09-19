import { describe, expect, it } from 'vitest';

import { contactSchema, groupQuoteSchema, reservationSchema } from '@/lib/schemas';

describe('schemas', () => {
  it('validates reservation schema', () => {
    const result = reservationSchema.safeParse({
      date: '2024-05-12',
      time: '14:00',
      packageKey: 'mini',
      restaurant: false,
      adults: 4,
      teens: 0,
      kids: 0,
      email: 'test@example.com',
      phone: '0450646290',
      name: 'Client Test',
    });
    expect(result.success).toBe(true);
  });

  it('rejects reservation without participants', () => {
    const result = reservationSchema.safeParse({
      date: '2024-05-12',
      time: '14:00',
      packageKey: 'mini',
      restaurant: false,
      adults: 0,
      teens: 0,
      kids: 0,
      email: 'test@example.com',
      phone: '0450646290',
      name: 'Client Test',
    });
    expect(result.success).toBe(false);
  });

  it('validates group quote schema', () => {
    const result = groupQuoteSchema.safeParse({
      company: 'Test Corp',
      participants: 15,
      duration: 90,
      catering: true,
      meetingRoom: true,
      email: 'corp@example.com',
      phone: '0123456789',
    });
    expect(result.success).toBe(true);
  });

  it('validates contact schema', () => {
    const result = contactSchema.safeParse({
      name: 'Alex',
      email: 'alex@example.com',
      phone: '0123456789',
      message: 'Nous souhaitons un devis détaillé.',
      consent: true,
    });
    expect(result.success).toBe(true);
  });
});
