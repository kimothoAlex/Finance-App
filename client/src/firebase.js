// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "finance--app-18237.firebaseapp.com",
  projectId: "finance--app-18237",
  storageBucket: "finance--app-18237.appspot.com",
  messagingSenderId: "794040682386",
  appId: "1:794040682386:web:b6725eca47c3714324234b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
