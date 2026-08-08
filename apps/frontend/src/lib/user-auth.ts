import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const USER_COOKIE = 'scw_user_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSecret(): string | null {
  const secret = process.env.USER_SESSION_SECRET;
  return secret ? `scw_user::${secret}` : null;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createUserSessionToken(userId: string): string {
  const secret = getSecret();
  if (!secret) throw new Error('USER_SESSION_SECRET is not set');
  const exp = String(Date.now() + SESSION_TTL_MS);
  const payload = `${userId}:${exp}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyUserSessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;

  const lastDotIndex = token.lastIndexOf('.');
  if (lastDotIndex <= 0) return null;

  const payload = token.slice(0, lastDotIndex);
  const mac = token.slice(lastDotIndex + 1);

  const colonIndex = payload.indexOf(':');
  if (colonIndex <= 0) return null;

  const userId = payload.slice(0, colonIndex);
  const exp = payload.slice(colonIndex + 1);

  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return null;

  if (safeEqual(mac, sign(payload, secret))) {
    return userId;
  }
  return null;
}

export async function getAuthenticatedUserId(): Promise<string | null> {
  const store = await cookies();
  return verifyUserSessionToken(store.get(USER_COOKIE)?.value);
}

export function userSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  };
}
