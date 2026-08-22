import { getMongoDB, initializeIndexes } from "../mongodb";
import { ScholarshipApplication } from "@/types";
import { initialApplications, initialStudents } from "../db/seedData";

// Resilient memory cache (synchronized with MongoDB)
let memoryStore: Map<string, ScholarshipApplication> = new Map();
let isInitialized = false;
const resubmissionLocks: Set<string> = new Set();

function initMemoryStore() {
  if (memoryStore.size === 0) {
    initialApplications.forEach((app) => {
      memoryStore.set(app.id, JSON.parse(JSON.stringify(app)));
    });
  }
}

export class ApplicationRepository {
  static async getApplication(id: string): Promise<ScholarshipApplication | null> {
    initMemoryStore();
    const db = await getMongoDB();

    if (db) {
      try {
        const doc = await db
          .collection<ScholarshipApplication>("scholarshipApplications")
          .findOne({ id }, { projection: { _id: 0 } });

        if (doc) {
          memoryStore.set(id, doc);
          return doc;
        }
      } catch (e) {
        console.warn("MongoDB fetch error, using memory cache:", e);
      }
    }

    return memoryStore.get(id) || null;
  }

  static async resubmitApplication(
    id: string,
    correctedFile: { fileName: string; fileUrl: string }
  ): Promise<ScholarshipApplication | null> {
    initMemoryStore();
    if (resubmissionLocks.has(id)) {
      return null;
    }

    resubmissionLocks.add(id);

    try {
      const app = await this.getApplication(id);
      if (!app || app.currentState !== "DEFECTIVE_INSTITUTE") return null;

      // Mutate state deterministically to RE_SUBMITTED_INSTITUTE
      const updatedApp: ScholarshipApplication = JSON.parse(JSON.stringify(app));
      updatedApp.currentState = "RE_SUBMITTED_INSTITUTE";
      updatedApp.lastUpdated = new Date().toISOString();
      updatedApp.daysAtCurrentDesk = 0;

      // Mark defects as resolved
      updatedApp.defects = updatedApp.defects.map((def) => ({
        ...def,
        isResolved: true,
        resolvedAt: new Date().toISOString(),
      }));

      // Update document
      updatedApp.documents = updatedApp.documents.map((doc) => {
        if (doc.type === "BONAFIDE_CERTIFICATE") {
          return {
            ...doc,
            isDefective: false,
            fileName: correctedFile.fileName,
            fileUrl: correctedFile.fileUrl,
            uploadDate: new Date().toISOString(),
          };
        }
        return doc;
      });

      // Update timeline
      const resubmissionEvent = {
        id: `TL_RESUB_${Date.now()}`,
        state: "RE_SUBMITTED_INSTITUTE" as const,
        desk: "COLLEGE_INO" as const,
        title: "Correction Submitted by Student",
        description: "Corrected Bonafide Certificate with Principal Seal uploaded. Re-queued for INO review.",
        timestamp: new Date().toISOString(),
        isCompleted: true,
      };

      const defectIdx = updatedApp.timeline.findIndex((t) => t.state === "DEFECTIVE_INSTITUTE");
      if (defectIdx >= 0) {
        updatedApp.timeline.splice(defectIdx + 1, 0, resubmissionEvent);
      } else {
        updatedApp.timeline.push(resubmissionEvent);
      }

      // Persist to MongoDB
      const db = await getMongoDB();
      if (db) {
        try {
          const updateResult = await db.collection("scholarshipApplications").updateOne(
            { id, currentState: "DEFECTIVE_INSTITUTE" },
            { $set: updatedApp }
          );

          if (updateResult.matchedCount === 0) return null;

          // Update defects collection
          for (const def of updatedApp.defects) {
            await db.collection("applicationDefects").updateOne(
              { id: def.id },
              { $set: def },
              { upsert: true }
            );
          }

          // Insert new timeline event
          await db.collection("statusHistory").insertOne({
            ...resubmissionEvent,
            applicationId: id,
          });
        } catch (e) {
          console.warn("MongoDB update persistence notice:", e);
          return null;
        }
      }

      // Save to memory cache after the mutation is accepted.
      memoryStore.set(id, updatedApp);
      return updatedApp;
    } finally {
      resubmissionLocks.delete(id);
    }
  }

  static async resetApplications(): Promise<void> {
    memoryStore.clear();
    initialApplications.forEach((app) => {
      memoryStore.set(app.id, JSON.parse(JSON.stringify(app)));
    });

    const db = await getMongoDB();
    if (db) {
      try {
        await initializeIndexes(db);

        // Clear existing synthetic collections
        await Promise.all([
          db.collection("applicationDocuments").deleteMany({}),
          db.collection("applicationDefects").deleteMany({}),
          db.collection("statusHistory").deleteMany({}),
        ]);

        // Upsert students
        for (const s of initialStudents) {
          await db.collection("students").replaceOne(
            { id: s.id },
            JSON.parse(JSON.stringify(s)),
            { upsert: true }
          );
        }

        // Upsert applications
        for (const a of initialApplications) {
          await db.collection("scholarshipApplications").replaceOne(
            { id: a.id },
            JSON.parse(JSON.stringify(a)),
            { upsert: true }
          );

          // Seed documents, defects, history
          if (a.documents.length > 0) {
            await db.collection("applicationDocuments").insertMany(
              a.documents.map((d) => ({ ...d, applicationId: a.id }))
            );
          }
          if (a.defects.length > 0) {
            await db.collection("applicationDefects").insertMany(
              a.defects.map((def) => ({ ...def, applicationId: a.id }))
            );
          }
          if (a.timeline.length > 0) {
            await db.collection("statusHistory").insertMany(
              a.timeline.map((tl) => ({ ...tl, applicationId: a.id }))
            );
          }
        }
      } catch (e) {
        console.warn("MongoDB reset operation notice:", e);
      }
    }
  }

  static async getAllApplications(): Promise<ScholarshipApplication[]> {
    initMemoryStore();
    const db = await getMongoDB();

    if (db) {
      try {
        const docs = await db
          .collection<ScholarshipApplication>("scholarshipApplications")
          .find({}, { projection: { _id: 0 } })
          .toArray();

        if (docs.length > 0) {
          docs.forEach((doc) => memoryStore.set(doc.id, doc));
          return docs;
        }
      } catch (e) {
        console.warn("MongoDB fetch all error, using memory store:", e);
      }
    }

    return Array.from(memoryStore.values());
  }
}
