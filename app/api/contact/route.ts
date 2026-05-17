import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_THRESHOLD = 0.5; 

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) throw new Error('RECAPTCHA_SECRET_KEY is not set');

  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = await res.json();
  return { success: data.success && data.score >= RECAPTCHA_THRESHOLD, score: data.score ?? 0 };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, recaptchaToken } = body;

    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // ── Verify reCAPTCHA ──
    const { success, score } = await verifyRecaptcha(recaptchaToken);
    if (!success) {
      return NextResponse.json(
        { message: `reCAPTCHA verification failed` },
        { status: 403 }
      );
    }

    // ── Send email via nodemailer ──
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: 'sabin.thapa07051999@gmail.com',
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a150a;">
          <div style="border-bottom: 2px solid #C9A84C; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="font-size: 24px; font-weight: 300; color: #9A6A0A; margin: 0;">
              New Portfolio Message
            </h2>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #5A4E2A; width: 80px;">From</td>
              <td style="padding: 8px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #5A4E2A;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #9A6A0A;">${email}</a></td>
            </tr>
            ${subject ? `<tr>
              <td style="padding: 8px 0; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #5A4E2A;">Subject</td>
              <td style="padding: 8px 0; font-size: 14px;">${subject}</td>
            </tr>` : ''}
          </table>
          <div style="background: #f5f0e8; border-left: 2px solid #C9A84C; padding: 20px 24px; font-size: 14px; line-height: 1.8; color: #1a150a;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          <p style="margin-top: 24px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #999; text-align: center;">
            reCAPTCHA score: ${score.toFixed(2)} · sent via iamsabin07.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (err: unknown) {
    console.error('[contact API]', err);
    return NextResponse.json(
      { message: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}