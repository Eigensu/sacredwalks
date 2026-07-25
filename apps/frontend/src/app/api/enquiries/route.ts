import { NextResponse } from 'next/server';
import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const yatra = String(body.yatra ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || phone.length > 50 || message.length > 5000) {
    return NextResponse.json({ error: 'One of the fields is too long' }, { status: 400 });
  }

  const db = await tryGetDb();
  if (!db) {
    return NextResponse.json(
      { error: 'We could not record your application right now. Please try again later.' },
      { status: 503 },
    );
  }

  await db.collection(COLLECTIONS.enquiries).insertOne({
    name,
    email,
    phone,
    yatra: yatra || 'General application',
    message,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
