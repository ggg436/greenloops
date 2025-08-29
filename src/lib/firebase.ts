// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC-6sz4wgSP43lU4fmOKRAnDxEG1eSRFl8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rock-perception-460403-b4.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://rock-perception-460403-b4-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rock-perception-460403-b4",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rock-perception-460403-b4.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "623256116252",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:623256116252:web:6d85681522391548f113d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only if supported
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// Configure Auth persistence and language
setPersistence(auth, browserLocalPersistence);
auth.languageCode = 'en';

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    // Uncomment these lines if you want to use Firebase emulators
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, 'localhost', 9199);
    console.log('Firebase initialized in development mode');
  } catch (error) {
    console.log('Firebase emulators not available:', error);
  }
}

export default app; 