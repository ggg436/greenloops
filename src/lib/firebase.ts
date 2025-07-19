// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "rock-perception-460403-b4",
  appId: "1:623256116252:web:6d85681522391548f113d9",
  storageBucket: "rock-perception-460403-b4.firebasestorage.app",
  apiKey: "AIzaSyC-6sz4wgSP43lU4fmOKRAnDxEG1eSRFl8",
  messagingSenderId: "623256116252",
  authDomain: "rock-perception-460403-b4.firebaseapp.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage }; 