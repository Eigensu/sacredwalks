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

let _indexesCreated = false;

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  const db = client.db(dbName);

  if (!_indexesCreated) {
    _indexesCreated = true;
    db.collection(COLLECTIONS.users)
      .createIndex({ googleId: 1 }, { unique: true, sparse: true })
      .catch(console.error);
    db.collection(COLLECTIONS.users).createIndex({ email: 1 }).catch(console.error);
  }

  return db;
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
  content: 'content',
  users: 'users',
} as const;
