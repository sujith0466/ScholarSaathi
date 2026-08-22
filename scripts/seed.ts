import * as fs from "fs";
import * as path from "path";

// Auto-load .env file if running standalone script
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

import { ApplicationRepository } from "../frontend/lib/repositories/applicationRepository";
import { getMongoDB, getMongoClient } from "../frontend/lib/mongodb";

async function main() {
  const requireMongo = process.argv.includes("--require-mongodb") || process.env.REQUIRE_MONGODB === "true";
  const configuredMongoUri = process.env.MONGODB_URI || "";
  if (
    requireMongo &&
    (configuredMongoUri.trim().length === 0 ||
      configuredMongoUri.includes("<db_username>") ||
      configuredMongoUri.includes("<db_password>") ||
      configuredMongoUri.includes("localhost") ||
      configuredMongoUri.includes("127.0.0.1"))
  ) {
    throw new Error("Strict seed mode requires a non-local MongoDB Atlas URI in MONGODB_URI.");
  }
  console.log("🌱 Starting ScholarSaathi MongoDB Seed & Indexing Process...");

  const db = await getMongoDB();
  if (requireMongo && !db) {
    throw new Error("Strict seed mode requires a configured and reachable MongoDB database.");
  }
  if (db) {
    console.log(`✅ Connected to Real MongoDB Database: "${db.databaseName}"`);
  } else {
    console.warn("⚠️ Operating without MongoDB connection. Seeding local memory store.");
  }

  await ApplicationRepository.resetApplications();

  if (db) {
    const studentCount = await db.collection("students").countDocuments();
    const appCount = await db.collection("scholarshipApplications").countDocuments();
    const docCount = await db.collection("applicationDocuments").countDocuments();
    const defCount = await db.collection("applicationDefects").countDocuments();
    const historyCount = await db.collection("statusHistory").countDocuments();

    console.log("📊 MongoDB Collection Record Verification:");
    console.log(`   - students: ${studentCount} records`);
    console.log(`   - scholarshipApplications: ${appCount} records`);
    console.log(`   - applicationDocuments: ${docCount} records`);
    console.log(`   - applicationDefects: ${defCount} records`);
    console.log(`   - statusHistory: ${historyCount} records`);

    const priya = await db.collection("scholarshipApplications").findOne({ id: "RJ202425008912" });
    if (priya) {
      console.log(`🎯 Priya Sharma Application Verification: Found in MongoDB (State: ${priya.currentState})`);
    } else {
      throw new Error("Priya Sharma application was not found in MongoDB!");
    }
  }

  console.log("✅ ScholarSaathi Database Seeding Completed Successfully.");
  const client = await getMongoClient();
  await client.close();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
