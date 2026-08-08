import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { COLLECTIONS, tryGetDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { id, status } = body;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid id' }, { status: 400 });
  }

  if (status !== 'ACCEPTED' && status !== 'REJECTED') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const db = await tryGetDb();
  if (!db) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }

  try {
    const result = await db.collection(COLLECTIONS.enquiries).updateOne(
      {
        _id: new ObjectId(id),
        yatra: 'Membership',
        status: { $in: [null, 'PENDING'] },
      },
      { $set: { status, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          error:
            'Membership application not found, or it is already in a terminal state (ACCEPTED/REJECTED).',
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Failed to update status', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
