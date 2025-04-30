/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import next from "next";

const app = next({ dev: false, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest(async(req, res) => {
    try {
        await app.prepare();
        handle(req, res);
      } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).send("Internal Server Error");
      }
});

