import { MongoClient, Db } from "mongodb";

function isPlaceholderMongoUri(uri: string | undefined): boolean {
  return Boolean(
    !uri ||
      uri.includes("<db_username>") ||
      uri.includes("<db_password>") ||
      uri.trim().length === 0
  );
}

function getMongoUri(): string | null {
  const envUri = process.env.MONGODB_URI;
  if (isPlaceholderMongoUri(envUri)) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }
    return "mongodb://127.0.0.1:27017/scholarsaathi";
  }
  return envUri!.replace("localhost:27017", "127.0.0.1:27017");
}

const uri = getMongoUri();
const dbName = process.env.MONGODB_DB_NAME || "scholarsaathi";

interface MongoGlobal {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const globalThis: MongoGlobal;

let clientPromise: Promise<MongoClient> | null = null;

if (uri && process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else if (uri) {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  });
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    throw new Error("MONGODB_URI is required in production and must not be a placeholder.");
  }
  return clientPromise;
}

export async function getMongoDB(): Promise<Db | null> {
  try {
    if (!clientPromise) {
      throw new Error("MongoDB is not configured for this environment.");
    }
    const client = await clientPromise;
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.warn("MongoDB connection warning. Operating with resilient memory cache:", err);
    return null;
  }
}

export async function initializeIndexes(db: Db): Promise<void> {
  try {
    await db.collection("students").createIndex({ id: 1 }, { unique: true });
    await db.collection("scholarshipApplications").createIndex({ id: 1 }, { unique: true });
    await db.collection("scholarshipApplications").createIndex({ studentId: 1 });
    await db.collection("applicationDocuments").createIndex({ applicationId: 1 });
    await db.collection("statusHistory").createIndex({ applicationId: 1 });
  } catch (err) {
    console.warn("Index creation notice:", err);
  }
}
