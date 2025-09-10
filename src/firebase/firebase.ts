import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDg27TmgN5rmSaj_O9out89uN0fYAzoRSY",
  authDomain: "atharva-32d64.firebaseapp.com",
  projectId: "atharva-32d64",
  storageBucket: "atharva-32d64.firebasestorage.app",
  messagingSenderId: "156909188256",
  appId: "1:156909188256:web:4d59e100b1731183e945c5",
  measurementId: "G-QLKX2S8CVB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export everything you need
export { auth, provider, db };
