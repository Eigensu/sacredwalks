import { NextResponse } from 'next/server';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { getAuthenticatedUserId } from '@/lib/user-auth';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const db = await getDb();
    const user = await db
      .collection(COLLECTIONS.users)
      .findOne({ _id: new ObjectId(userId) }, { projection: { name: 1, email: 1, picture: 1 } });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
