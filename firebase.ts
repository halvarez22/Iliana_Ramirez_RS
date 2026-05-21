// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmtDPUPSxwG7yrBSVvKAMlu6eB-VxryGY",
  authDomain: "first-real-estate-8bd3a.firebaseapp.com",
  projectId: "first-real-estate-8bd3a",
  storageBucket: "first-real-estate-8bd3a.firebasestorage.app",
  messagingSenderId: "17737692609",
  appId: "1:17737692609:web:67b43bb3893771f4486b40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
