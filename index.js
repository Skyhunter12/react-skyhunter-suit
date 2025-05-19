const { initializeApp } = require("firebase-admin/app");
const next = require("next");
const { onRequest } = require("firebase-functions/v2/https");

// Initialize Firebase
initializeApp();
// Resolve the root directory
// Next.js app setup
const nextjsServer = next({
  dev: false,
  conf: {
    distDir: 'next',
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.next_app = onRequest((req, res) => {
  return nextjsServer.prepare().then(() => {
    try {
      return nextjsHandle(req, res);
    } catch (error) {
      console.error("Error handling request:", error);
      res.json({ success: false, error });
    }
  });
});