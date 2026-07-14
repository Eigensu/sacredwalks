import { NextResponse } from 'next/server';
import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = String(body.email ?? '')
    .trim()
    .toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  const db = await tryGetDb();
  if (!db) {
    return NextResponse.json(
      { error: 'We could not record your subscription right now. Please try again later.' },
      { status: 503 },
    );
  }

  await db
    .collection(COLLECTIONS.subscribers)
    .updateOne({ email }, { $setOnInsert: { email, createdAt: new Date() } }, { upsert: true });

  return NextResponse.json({ ok: true });
}
