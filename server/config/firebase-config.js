// server/config/firebase-config.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "./serviceAccountKey.json" assert { type: "json" };

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccountKey),
});

const auth = getAuth(app);

export default auth;
