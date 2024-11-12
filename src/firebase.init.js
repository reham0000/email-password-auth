// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx6-UfenV7-77XkmuKNY0wRvWCSLNg9y4",
  authDomain: "email-password-auth-8c7c3.firebaseapp.com",
  projectId: "email-password-auth-8c7c3",
  storageBucket: "email-password-auth-8c7c3.firebasestorage.app",
  messagingSenderId: "653363759645",
  appId: "1:653363759645:web:573bae161643f1c74e94f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);