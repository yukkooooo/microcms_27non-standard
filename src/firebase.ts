import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "process.env.NEXT_PUBLIC_FIREBASE_APIKEY",

  authDomain: "process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN ",

  projectId: "process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ",

  storageBucket: "process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET",

  messagingSenderId: "process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID",

  appId: "process.env.NEXT_PUBLIC_FIREBASE_APP_ID",
};

// Firebaseを初期化する
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { db, auth, app };