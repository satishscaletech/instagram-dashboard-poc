// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: "AIzaSyBHjZaHOhaZQk-7ZH94B6IlDiFoXFOrRrA",
  authDomain: "instagram-dashboard-f07a3.firebaseapp.com",
  databaseURL: "https://instagram-dashboard-f07a3-default-rtdb.firebaseio.com",
  projectId: "instagram-dashboard-f07a3",
  storageBucket: "instagram-dashboard-f07a3.appspot.com",
  messagingSenderId: "168309574879",
  appId: "1:168309574879:web:76b53d912efa2d8ecced6a",
  measurementId: "G-VNVD73HXRW"
};

// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth(app)
export const db = getDatabase();