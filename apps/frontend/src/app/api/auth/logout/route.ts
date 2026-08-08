import { NextResponse } from 'next/server';
import { USER_COOKIE } from '@/lib/user-auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(USER_COOKIE);
  return response;
}
