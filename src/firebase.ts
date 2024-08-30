import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_API_KEY",

  authDomain: "process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",

  projectId: " process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ",

  storageBucket: "process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",

  messagingSenderId: "process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",

  appId: "process.env.",
};

// Firebaseを初期化する
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { db, auth, app };