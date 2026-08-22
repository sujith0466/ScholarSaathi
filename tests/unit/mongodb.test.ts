import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env file for tests
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

import { ApplicationRepository } from "../../frontend/lib/repositories/applicationRepository";
import { getMongoDB, getMongoClient } from "../../frontend/lib/mongodb";

describe("Real MongoDB Integration & Persistence Tests", () => {
  beforeAll(async () => {
    await ApplicationRepository.resetApplications();
  });



  it("should connect to real MongoDB database 'scholarsaathi'", async () => {
    const db = await getMongoDB();
    expect(db).not.toBeNull();
    expect(db?.databaseName).toBe("scholarsaathi");
  });

  it("should verify required collections exist and are populated", async () => {
    const db = await getMongoDB();
    expect(db).not.toBeNull();

    const studentCount = await db!.collection("students").countDocuments();
    const appCount = await db!.collection("scholarshipApplications").countDocuments();
    const docCount = await db!.collection("applicationDocuments").countDocuments();

    expect(studentCount).toBeGreaterThanOrEqual(2);
    expect(appCount).toBeGreaterThanOrEqual(2);
    expect(docCount).toBeGreaterThanOrEqual(2);
  });

  it("should read Priya Sharma's application directly from MongoDB", async () => {
    const priya = await ApplicationRepository.getApplication("RJ202425008912");

    expect(priya).not.toBeNull();
    expect(priya?.id).toBe("RJ202425008912");
    expect(priya?.student.name).toBe("Priya Sharma");
    expect(priya?.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(priya?.defects.length).toBeGreaterThan(0);
    expect(priya?.defects[0].isResolved).toBe(false);
  });

  it("should perform real write to MongoDB: mutate to RE_SUBMITTED_INSTITUTE", async () => {
    const updated = await ApplicationRepository.resubmitApplication("RJ202425008912", {
      fileName: "Priya_Bonafide_Stamped_Verified.pdf",
      fileUrl: "/synthetic/bonafide_valid.png",
    });

    expect(updated).not.toBeNull();
    expect(updated?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(updated?.defects[0].isResolved).toBe(true);

    // Direct MongoDB verification to guarantee it persisted in database
    const db = await getMongoDB();
    const mongoDoc = await db!.collection("scholarshipApplications").findOne({ id: "RJ202425008912" });

    expect(mongoDoc).not.toBeNull();
    expect(mongoDoc?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(mongoDoc?.defects[0].isResolved).toBe(true);
  });

  it("should confirm persistence after reading again", async () => {
    const priyaAfter = await ApplicationRepository.getApplication("RJ202425008912");

    expect(priyaAfter).not.toBeNull();
    expect(priyaAfter?.currentState).toBe("RE_SUBMITTED_INSTITUTE");
    expect(priyaAfter?.documents.find((d) => d.type === "BONAFIDE_CERTIFICATE")?.fileName).toBe(
      "Priya_Bonafide_Stamped_Verified.pdf"
    );
  });

  it("should reset database state back to initial seed", async () => {
    await ApplicationRepository.resetApplications();

    const priyaReset = await ApplicationRepository.getApplication("RJ202425008912");
    expect(priyaReset?.currentState).toBe("DEFECTIVE_INSTITUTE");
    expect(priyaReset?.defects[0].isResolved).toBe(false);
  });
});
