import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';
import { contactSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = rateLimit(identifier);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  if (process.env.DATABASE_URL) {
    try {
      await prisma.contactRequest.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
      });
    } catch (error) {
      console.error('Contact persistence failed', error);
    }
  }

  try {
    if (process.env.EMAIL_SERVER_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: `Nouveau contact – ${data.name}`,
        text: `${data.name} (${data.email} / ${data.phone})\n\n${data.message}`,
      });
    }
  } catch (error) {
    console.error('Email send failed', error);
  }

  return NextResponse.json({ ok: true });
}
