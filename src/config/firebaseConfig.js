// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWQcKRAvqcDJevtZ9CAk0ISpFKsXrofSY",
  authDomain: "kudumart-fd2b6.firebaseapp.com",
  projectId: "kudumart-fd2b6",
  storageBucket: "kudumart-fd2b6.firebasestorage.app",
  messagingSenderId: "1054207743436",
  appId: "1:1054207743436:web:31bf6097050aeb057a3969",
  measurementId: "G-8FYHPK2RPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };

