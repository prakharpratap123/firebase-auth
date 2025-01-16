import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKnVKfALjdRTaVolt3ZFG-Uh1jk5YbAwQ",
  authDomain: "fir-tut-39b90.firebaseapp.com",
  projectId: "fir-tut-39b90",
  storageBucket: "fir-tut-39b90.firebasestorage.app",
  messagingSenderId: "642709582982",
  appId: "1:642709582982:web:5f0fae0f27be8aef2b8d07",
  measurementId: "G-KNZ7RVSJZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
