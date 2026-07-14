import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { Readable } from 'node:stream';
import { getMediaBucket, isDbConfigured } from '@/lib/mongodb';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isDbConfigured() || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const bucket = await getMediaBucket();
    const fileId = new ObjectId(id);
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    const file = files[0];
    const nodeStream = bucket.openDownloadStream(fileId);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    return new Response(webStream, {
      headers: {
        'Content-Type': (file.metadata?.contentType as string) || 'application/octet-stream',
        'Content-Length': String(file.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('Failed to stream media:', err);
    return NextResponse.json({ error: 'Failed to load media' }, { status: 500 });
  }
}
