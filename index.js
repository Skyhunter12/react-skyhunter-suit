import { initializeApp } from "firebase-admin/app";
import next from "next";

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