import { NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/admin-auth';
import { getMediaBucket, isDbConfigured } from '@/lib/mongodb';

const MAX_BYTES = 64 * 1024 * 1024; // 64 MB
const ALLOWED_PREFIXES = ['image/', 'video/'];

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'MongoDB is not configured. Set MONGODB_URI to upload media.' },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }
  if (!ALLOWED_PREFIXES.some((p) => file.type.startsWith(p))) {
    return NextResponse.json({ error: 'Only image and video files are allowed' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'File is too large (max 64 MB). Host larger videos externally and paste the URL.' },
      { status: 413 },
    );
  }

  try {
    const bucket = await getMediaBucket();
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type, uploadedAt: new Date() },
    });
    await new Promise<void>((resolve, reject) => {
      uploadStream.on('error', reject);
      uploadStream.on('finish', () => resolve());
      uploadStream.end(buffer);
    });
    return NextResponse.json({ ok: true, url: `/api/media/${uploadStream.id.toString()}` });
  } catch (err) {
    console.error('Media upload failed:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
