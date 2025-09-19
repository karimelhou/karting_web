import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { reservationSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = rateLimit(identifier);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  if (process.env.DATABASE_URL) {
    try {
      await prisma.reservationRequest.create({
        data: {
          date: data.date,
          time: data.time,
          packageKey: data.packageKey,
          restaurant: data.restaurant,
          adults: data.adults,
          teens: data.teens,
          kids: data.kids,
          email: data.email,
          phone: data.phone,
          name: data.name,
        },
      });
    } catch (error) {
      console.error('Reservation persistence failed', error);
    }
  }

  return NextResponse.json({ ok: true });
}
