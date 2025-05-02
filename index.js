import { initializeApp } from "firebase-admin/app";
import next from "next";

const port = process.env.PORT||4000;

// Initialize Firebase
initializeApp();
// Resolve the root directory
// Next.js app setup
const nextjsServer = next({
  dev: false,
  conf: {
    distDir: '.next',
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.next_app = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});