import { ObjectId } from 'mongodb';
import { COLLECTIONS, tryGetDb } from './mongodb';
import { getAuthenticatedUserId } from './user-auth';

export type MembershipStatus = 'NONE' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

export async function getCurrentUserMembershipStatus(): Promise<{
  status: MembershipStatus;
  email: string | null;
}> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { status: 'NONE', email: null };
  }

  const db = await tryGetDb();
  if (!db) {
    return { status: 'NONE', email: null };
  }

  const user = await db.collection(COLLECTIONS.users).findOne({ _id: new ObjectId(userId) });
  if (!user || !user.email) {
    return { status: 'NONE', email: null };
  }

  const email = String(user.email).toLowerCase().trim();

  const enquiries = await db
    .collection(COLLECTIONS.enquiries)
    .find({ email, yatra: 'Membership' }, { sort: { createdAt: -1 } })
    .toArray();

  if (enquiries.length === 0) {
    return { status: 'NONE', email };
  }

  // Prioritize ACCEPTED, then PENDING, then REJECTED.
  const hasAccepted = enquiries.some((e) => e.status === 'ACCEPTED');
  if (hasAccepted) {
    return { status: 'ACCEPTED', email };
  }

  const hasPending = enquiries.some((e) => !e.status || e.status === 'PENDING');
  if (hasPending) {
    return { status: 'PENDING', email };
  }

  return { status: 'REJECTED', email };
}
