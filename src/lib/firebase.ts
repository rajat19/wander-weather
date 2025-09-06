// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean;
  }
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNnluwADJFaceTVz9NHv9Uv23CGbgF9Iw",
  authDomain: "wander-month-map.firebaseapp.com",
  projectId: "wander-month-map",
  storageBucket: "wander-month-map.firebasestorage.app",
  messagingSenderId: "704472271281",
  appId: "1:704472271281:web:3e6620c41e9b9929721590",
  measurementId: "G-DLL5TMYY76",
  appCheckSiteKey: "6LfuA8ArAAAAACaHuZpRP0Bo6icA-hpI2cVYRZ-E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and App Check only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  const siteKey = firebaseConfig.appCheckSiteKey;

  // Enable App Check debug token on localhost for development
  if (window.location.hostname === 'localhost') {
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  if (siteKey) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true
    });
  }

  isSupported().then(yes => yes ? getAnalytics(app) : null).then(analyticsInstance => {
    analytics = analyticsInstance;
  });
}

const db = getFirestore(app);

export { app, analytics, db };