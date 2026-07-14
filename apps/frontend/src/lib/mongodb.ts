import { Db, GridFSBucket, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'sacredwalks';

declare global {
  var _scwMongoClientPromise: Promise<MongoClient> | undefined;
}

export function isDbConfigured(): boolean {
  return Boolean(uri);
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  if (!global._scwMongoClientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    global._scwMongoClientPromise = client.connect();
  }
  return global._scwMongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

/** Returns the db, or null when MongoDB is not configured or unreachable. */
export async function tryGetDb(): Promise<Db | null> {
  if (!uri) return null;
  try {
    return await getDb();
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    return null;
  }
}

export async function getMediaBucket(): Promise<GridFSBucket> {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: 'media' });
}

export const COLLECTIONS = {
  enquiries: 'enquiries',
  subscribers: 'subscribers',
  content: 'content',
} as const;
