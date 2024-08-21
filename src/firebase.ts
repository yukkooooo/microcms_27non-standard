import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmcAD7NEbMzhfbEvZ1QHcS7O00JKukVHc",
  authDomain: "ec-with-microcms.firebaseapp.com",
  projectId: "ec-with-microcms",
  storageBucket: "ec-with-microcms.appspot.com",
  messagingSenderId: "627846732839",
  appId: "1:627846732839:web:c1f4589aba040735780202"
};

// Firebaseを初期化する
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { db, auth, app };