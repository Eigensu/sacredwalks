import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { COLLECTIONS, isDbConfigured, tryGetDb } from '@/lib/mongodb';

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = await tryGetDb();
  if (!db) {
    return NextResponse.json({ enquiries: [], dbConfigured: isDbConfigured() });
  }
  const enquiries = await db
    .collection(COLLECTIONS.enquiries)
    .find({}, { sort: { createdAt: -1 }, limit: 500 })
    .toArray();
  return NextResponse.json({
    enquiries: enquiries.map((e) => ({ ...e, _id: String(e._id) })),
    dbConfigured: true,
  });
}
