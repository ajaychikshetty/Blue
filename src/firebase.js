// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bluecollar-33e04.firebaseapp.com",
  projectId: "bluecollar-33e04",
  storageBucket: "bluecollar-33e04.appspot.com",
  messagingSenderId: "83512677355",
  appId: "1:83512677355:web:9b4870f0d5d25b9e687fae",
  measurementId: "G-QQXGGMDPL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const auth = getAuth();
 export const storage = getStorage(app);
