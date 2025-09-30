// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyDlzuiI1fQR8BDToe1UljIGtsquW69XCtk",
//   authDomain: "shipraseeds-form.firebaseapp.com",
//   projectId: "shipraseeds-form",
//   storageBucket: "shipraseeds-form.firebasestorage.app",
//   messagingSenderId: "535652800329",
//   appId: "1:535652800329:web:623fa1a6a297b3c7b96c98",
//   measurementId: "G-D98GH36KQ8"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBLMT-kpxASlNpQ3QFbhdpORcUA8BX91n8",
//   authDomain: "bamboo-antler-451207-p9.firebaseapp.com",
//   projectId: "bamboo-antler-451207-p9",
//   storageBucket: "bamboo-antler-451207-p9.firebasestorage.app",
//   messagingSenderId: "146231161398",
//   appId: "1:146231161398:web:90968e43474e8efd129e97",
//   measurementId: "G-4TD4G7GH8G"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCgAkLEZbSj_rmOVkFrcgx4YZNI88lInI0",
  authDomain: "shipra-seeds.firebaseapp.com",
  projectId: "shipra-seeds",
  storageBucket: "shipra-seeds.firebasestorage.app",
  messagingSenderId: "287855864459",
  appId: "1:287855864459:web:3b6f882e5d220833d9c28e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export { db };
