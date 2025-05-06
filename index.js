const { initializeApp } = require("firebase-admin/app");
const next = require("next");
const { onRequest } = require("firebase-functions/v2/https");


const port = process.env.PORT||4000;

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
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});