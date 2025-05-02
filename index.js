import { initializeApp } from "firebase-admin/app";
import next from "next";
import { onRequest } from "firebase-functions/v2/https";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain:process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};
const port = process.env.PORT||4000;

// Initialize Firebase
initializeApp(firebaseConfig);
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
    handle(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Export files from the root directory
// export * from path.resolve(rootDir, "./index");