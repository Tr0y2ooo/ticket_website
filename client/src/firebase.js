// client/src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpbw_K5wUfYT0peQfF6RslRy7i60KYnRA",
  authDomain: "ticket-482c0.firebaseapp.com",
  projectId: "ticket-482c0",
  storageBucket: "ticket-482c0.firebasestorage.app",
  messagingSenderId: "822132066047",
  appId: "1:822132066047:web:f387151a359b23d79daeca",
  measurementId: "G-ZLXEGNVGYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);