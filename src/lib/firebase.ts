// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNnluwADJFaceTVz9NHv9Uv23CGbgF9Iw",
  authDomain: "wander-month-map.firebaseapp.com",
  projectId: "wander-month-map",
  storageBucket: "wander-month-map.firebasestorage.app",
  messagingSenderId: "704472271281",
  appId: "1:704472271281:web:3e6620c41e9b9929721590",
  measurementId: "G-DLL5TMYY76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes ? getAnalytics(app) : null).then(analyticsInstance => {
    analytics = analyticsInstance;
  });
}

const db = getFirestore(app);

export { app, analytics, db };