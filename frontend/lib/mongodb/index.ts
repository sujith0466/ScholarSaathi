import { MongoClient, Db } from "mongodb";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env if running standalone script or worker
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf-8");
      envContent.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          const val = vals.join("=").trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      });
    }
  } catch {}
}

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

interface MongoGlobal {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const globalThis: MongoGlobal;

let clientPromise: Promise<MongoClient> | null = null;

function getOrCreateClientPromise(): Promise<MongoClient> | null {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = getMongoUri();
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalThis._mongoClientPromise) {
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
  } else {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getMongoClient(): Promise<MongoClient> {
  const promise = getOrCreateClientPromise();
  if (!promise) {
    throw new Error("MONGODB_URI is required and must be configured.");
  }
  return promise;
}

export async function getMongoDB(): Promise<Db | null> {
  const dbName = process.env.MONGODB_DB_NAME || "scholarsaathi";
  try {
    const promise = getOrCreateClientPromise();
    if (!promise) {
      throw new Error("MongoDB is not configured for this environment.");
    }
    const client = await promise;
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
