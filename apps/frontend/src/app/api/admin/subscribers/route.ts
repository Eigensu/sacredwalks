import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { COLLECTIONS, isDbConfigured, tryGetDb } from '@/lib/mongodb';

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = await tryGetDb();
  if (!db) {
    return NextResponse.json({ subscribers: [], dbConfigured: isDbConfigured() });
  }
  const subscribers = await db
    .collection(COLLECTIONS.subscribers)
    .find({}, { sort: { createdAt: -1 }, limit: 2000 })
    .toArray();
  return NextResponse.json({
    subscribers: subscribers.map((s) => ({ ...s, _id: String(s._id) })),
    dbConfigured: true,
  });
}
