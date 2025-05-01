import { https } from "firebase-functions";
import next from "next";

const app = next({ dev: false, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export const nextApp = https.onRequest(async (req, res) => {
  try {
    await app.prepare();
    handle(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});