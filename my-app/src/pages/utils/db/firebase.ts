import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";

function getEnvValue(privateKey: string, publicKey: string): string {
  return process.env[privateKey] || process.env[publicKey] || "";
}

const firebaseConfig: FirebaseOptions = {
  apiKey: getEnvValue("FIREBASE_API_KEY", "NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: getEnvValue(
    "FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
  ),
  projectId: getEnvValue("FIREBASE_PROJECT_ID", "NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getEnvValue(
    "FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"
  ),
  messagingSenderId: getEnvValue(
    "FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"
  ),
  appId: getEnvValue("FIREBASE_APP_ID", "NEXT_PUBLIC_FIREBASE_APP_ID"),
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error(
    "Firebase config is incomplete. Set FIREBASE_* or NEXT_PUBLIC_FIREBASE_* variables."
  );
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firestoreDatabaseId =
  process.env.FIREBASE_FIRESTORE_DATABASE_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID ||
  "(default)";

export const productsCollectionName =
  process.env.FIREBASE_PRODUCTS_COLLECTION ||
  process.env.NEXT_PUBLIC_FIREBASE_PRODUCTS_COLLECTION ||
  "products";

export default app;
