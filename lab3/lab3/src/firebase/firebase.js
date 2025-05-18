// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgJNJmT9jXSmIDcKgF5l28rgjxIunCYOw",
  authDomain: "lab4-f5e72.firebaseapp.com",
  projectId: "lab4-f5e72",
  storageBucket: "lab4-f5e72.firebasestorage.app",
  messagingSenderId: "689155789845",
  appId: "1:689155789845:web:bd3a2be3c026297df56a1c",
  measurementId: "G-JWN52XDWBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth};