import * as admin from "firebase-admin";
import next from "next";
import { onRequest } from "firebase-functions/v2/https";

if (!admin.apps.length) {
    admin.initializeApp();
  }
// Initialize Firebase Admin
admin.initializeApp();

// Resolve the root directory
// Next.js app setup
const app = next({ dev: false, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

// Export Next.js app as a Firebase Function
export const next_app = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  try {
    await app.prepare();
    return handle(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export files from the root directory
// export * from path.resolve(rootDir, "./index");