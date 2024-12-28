// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVbhNuqEpvigICVWCLATlqu5Our-o0z18",
  authDomain: "e-budget-8a32f.firebaseapp.com",
  projectId: "e-budget-8a32f",
  storageBucket: "e-budget-8a32f.firebasestorage.app",
  messagingSenderId: "326061612558",
  appId: "1:326061612558:web:078a3c9f65716297c3665f",
  measurementId: "G-EY4DLWPFFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };