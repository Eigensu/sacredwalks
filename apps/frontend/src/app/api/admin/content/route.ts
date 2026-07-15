import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getSiteContent, saveSiteContent, SiteContent } from '@/lib/content';
import { isDbConfigured } from '@/lib/mongodb';

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = await getSiteContent();
  return NextResponse.json({ content, dbConfigured: isDbConfigured() });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'MongoDB is not configured. Set MONGODB_URI to save content.' },
      { status: 503 },
    );
  }

  let body: { content?: SiteContent };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (!body.content || typeof body.content !== 'object') {
    return NextResponse.json({ error: 'Missing content' }, { status: 400 });
  }

  try {
    await saveSiteContent(body.content);
  } catch (err) {
    console.error('Failed to save content:', err);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
