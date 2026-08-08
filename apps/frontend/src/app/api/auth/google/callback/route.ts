import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb, COLLECTIONS } from '@/lib/mongodb';
import { createUserSessionToken, USER_COOKIE, userSessionCookieOptions } from '@/lib/user-auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const savedState = cookieStore.get('scw_oauth_state')?.value;

  if (!state || !savedState || state !== savedState) {
    console.error('OAuth state mismatch or missing');
    return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Google OAuth credentials not configured');
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }

  const redirectUri = `${url.origin}/api/auth/google/callback`;

  try {
    // 1. Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Google token exchange failed:', tokenData);
      return NextResponse.redirect(new URL('/?error=token_exchange_failed', request.url));
    }

    const { id_token } = tokenData;

    // 2. Verify id_token and extract user info
    const tokenInfoResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`,
    );
    const tokenInfo = await tokenInfoResponse.json();

    if (!tokenInfoResponse.ok || !tokenInfo.email || !tokenInfo.email_verified) {
      console.error('Google token verification failed or email not verified:', tokenInfo);
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }

    if (tokenInfo.aud !== clientId) {
      console.error('Token audience mismatch');
      return NextResponse.redirect(new URL('/?error=invalid_token_aud', request.url));
    }

    if (
      tokenInfo.iss !== 'https://accounts.google.com' &&
      tokenInfo.iss !== 'accounts.google.com'
    ) {
      console.error('Token issuer mismatch');
      return NextResponse.redirect(new URL('/?error=invalid_token_iss', request.url));
    }

    const currentUnixTime = Math.floor(Date.now() / 1000);
    if (tokenInfo.exp < currentUnixTime) {
      console.error('Token expired');
      return NextResponse.redirect(new URL('/?error=token_expired', request.url));
    }

    // 3. Upsert user in database
    const db = await getDb();
    const usersCollection = db.collection(COLLECTIONS.users);

    const now = new Date();

    // We try to find by googleId or email (in case they previously logged in or were invited)
    let user = await usersCollection.findOne({
      $or: [{ googleId: tokenInfo.sub }, { email: tokenInfo.email }],
    });

    if (user) {
      // Update existing user
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            googleId: tokenInfo.sub,
            name: tokenInfo.name,
            picture: tokenInfo.picture,
            lastLogin: now,
          },
        },
      );
    } else {
      // Create new user
      const result = await usersCollection.insertOne({
        googleId: tokenInfo.sub,
        email: tokenInfo.email,
        name: tokenInfo.name,
        picture: tokenInfo.picture,
        createdAt: now,
        lastLogin: now,
      });
      user = { _id: result.insertedId };
    }

    // 4. Set session cookie and redirect
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('scw_oauth_state');
    response.cookies.set(
      USER_COOKIE,
      createUserSessionToken(user._id.toString()),
      userSessionCookieOptions(),
    );

    return response;
  } catch (err) {
    console.error('OAuth callback error:', err);
    return NextResponse.redirect(new URL('/?error=auth_error', request.url));
  }
}
