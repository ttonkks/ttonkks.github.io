// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgJNJmT9jXSmIDcKgF5l28rgjxIunCYOw",
  authDomain: "lab4-f5e72.firebaseapp.com",
  projectId: "lab4-f5e72",
  storageBucket: "lab4-f5e72.appspot.com",
  messagingSenderId: "689155789845",
  appId: "1:689155789845:web:bd3a2be3c026297df56a1c",
  measurementId: "G-JWN52XDWBT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
