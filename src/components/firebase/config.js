import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//Firestore Config File for Project Endless
const firebaseConfig = {
  apiKey: "AIzaSyDakKMmhLHs2fqN-d2C0zSshqJasvnh5RY",
  authDomain: "minecraftnpc.firebaseapp.com",
  projectId: "minecraftnpc",
  storageBucket: "minecraftnpc.appspot.com",
  messagingSenderId: "315756692269",
  appId: "1:315756692269:web:c85895c8af904e89e649a4",
  measurementId: "G-0BTC71ZDTK"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth };