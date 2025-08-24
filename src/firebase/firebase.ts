// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg27TmgN5rmSaj_O9out89uN0fYAzoRSY",
  authDomain: "atharva-32d64.firebaseapp.com",
  projectId: "atharva-32d64",
  storageBucket: "atharva-32d64.firebasestorage.app",
  messagingSenderId: "156909188256",
  appId: "1:156909188256:web:4d59e100b1731183e945c5",
  measurementId: "G-QLKX2S8CVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize and export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);

export default function signup (email ,password){
  return createUserWithEmailAndPassword(auth , email , password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}


export function logout() {
  return signOut(auth);
}