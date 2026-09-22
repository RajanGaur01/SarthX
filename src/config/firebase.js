// SarthX Firebase Configuration & Services
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB7fJrd8TVL8e76MhCH_l5P5Rv2dQyqJ-Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sarthx-34baa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sarthx-34baa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sarthx-34baa.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "353908980722",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:353908980722:web:cdc9458ac8582b05ad496b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-D8Y0S9PKW3"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  // Cloud Firestore functions
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  serverTimestamp
};

