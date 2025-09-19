import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { groupQuoteSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = rateLimit(identifier);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = groupQuoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  if (process.env.DATABASE_URL) {
    try {
      await prisma.lead.create({
        data: {
          company: data.company,
          participants: data.participants,
          duration: data.duration,
          catering: data.catering,
          meetingRoom: data.meetingRoom,
          email: data.email,
          phone: data.phone,
          message: data.message ?? null,
        },
      });
    } catch (error) {
      console.error('Lead persistence failed', error);
    }
  }

  return NextResponse.json({ ok: true });
}
