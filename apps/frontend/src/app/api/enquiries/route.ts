import { NextResponse } from 'next/server';
import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';
import { getAuthenticatedUserId } from '@/lib/user-auth';
import { ObjectId } from 'mongodb';

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

  // If user is authenticated, override the submitted email with their verified Google email
  const userId = await getAuthenticatedUserId();
  let finalEmail = email;
  if (userId) {
    const user = await db.collection(COLLECTIONS.users).findOne({ _id: new ObjectId(userId) });
    if (user && user.email) {
      finalEmail = String(user.email);
    }
  }

  const insertData: Record<string, unknown> = {
    name,
    email: finalEmail,
    phone,
    yatra: yatra || 'General application',
    message,
    createdAt: new Date(),
  };

  if (insertData.yatra === 'Membership') {
    insertData.status = 'PENDING';
  }

  await db.collection(COLLECTIONS.enquiries).insertOne(insertData);

  return NextResponse.json({ ok: true });
}
