// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCymiKvt52CjKq14NTm8Qxe2rTkCK-Rbcw",
  authDomain: "netflixgpt-7819e.firebaseapp.com",
  projectId: "netflixgpt-7819e",
  storageBucket: "netflixgpt-7819e.firebasestorage.app",
  messagingSenderId: "733881190586",
  appId: "1:733881190586:web:1df18b0f4aaa1614125a83",
  measurementId: "G-451WW2NTZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();