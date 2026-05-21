import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5-WugVwHV2aFtl48IV2WJfVEQM5xq0qY",
  authDomain: "construction-6993e.firebaseapp.com",
  databaseURL: "https://construction-6993e-default-rtdb.firebaseio.com",
  projectId: "construction-6993e",
  storageBucket: "construction-6993e.firebasestorage.app",
  messagingSenderId: "312619601976",
  appId: "1:312619601976:web:00e0a6daf5dfb42e0316cd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
