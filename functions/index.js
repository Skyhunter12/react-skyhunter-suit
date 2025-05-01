import * as functions from "firebase-functions";
import next from "next";
const dir = __dirname

const app = next({ dev: false,dir, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest(async (req, res) => {
  try {
    await app.prepare();
    handle(req, res);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});