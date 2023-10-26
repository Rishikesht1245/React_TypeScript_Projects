import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  deleteDoc,
  doc,
  Firestore,
} from "firebase/firestore";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();
const db: Firestore = getFirestore(app);

export { auth, provider, db, collection, addDoc, getDocs, deleteDoc, doc };
