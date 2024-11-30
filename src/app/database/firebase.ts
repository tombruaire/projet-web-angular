// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFCaj1ZR80cz_kg_h3xUHhfih9oQT1b-E",
  authDomain: "game-haven-bb46e.firebaseapp.com",
  projectId: "game-haven-bb46e",
  storageBucket: "game-haven-bb46e.firebasestorage.app",
  messagingSenderId: "113327270434",
  appId: "1:113327270434:web:69ce1207b8f5e1d58c387b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const store = getFirestore(app);
const auth = getAuth(app);

export {
    store, auth
}