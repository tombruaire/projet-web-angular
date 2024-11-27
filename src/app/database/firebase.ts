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
  apiKey: "AIzaSyDjbTteAzi8fheUiSqq8jhXXj2HO-BtEcc",
  authDomain: "game-haven-blog.firebaseapp.com",
  projectId: "game-haven-blog",
  storageBucket: "game-haven-blog.firebasestorage.app",
  messagingSenderId: "55292533705",
  appId: "1:55292533705:web:922d4ecb113d9afa2d6618",
  measurementId: "G-TPKMQ85HNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const store = getFirestore(app);
const auth = getAuth(app);

export {
    store, auth
}