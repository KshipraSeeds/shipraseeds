// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlzuiI1fQR8BDToe1UljIGtsquW69XCtk",
  authDomain: "shipraseeds-form.firebaseapp.com",
  projectId: "shipraseeds-form",
  storageBucket: "shipraseeds-form.firebasestorage.app",
  messagingSenderId: "535652800329",
  appId: "1:535652800329:web:623fa1a6a297b3c7b96c98",
  measurementId: "G-D98GH36KQ8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
