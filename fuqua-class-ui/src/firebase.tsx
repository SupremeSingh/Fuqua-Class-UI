import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from "@firebase/firestore";


// ------------------------------ Setting up Firebase Auth and Database --------------------

const firebaseConfig = {
  apiKey: "AIzaSyAkAAhIGYHn5ZywgaoRVHQ52mIzaBtLkaU",
  authDomain: "fuqua-class-app.firebaseapp.com",
  projectId: "fuqua-class-app",
  storageBucket: "fuqua-class-app.appspot.com",
  messagingSenderId: "639691601439",
  appId: "1:639691601439:web:ab3770a764d1e76588472a",
  measurementId: "G-QPL17BXKJP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
