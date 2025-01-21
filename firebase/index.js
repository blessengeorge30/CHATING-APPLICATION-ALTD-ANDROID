// Import the necessary functions from React Native Firebase
import { getApp, getApps, initializeApp } from '@react-native-firebase/app';

// Firebase configuration (use the details from your Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBYIBtdG2axdZ-PUjGOPHSa0thuLNRamGo",
  authDomain: "otpauth-6c04a.firebaseapp.com",
  projectId: "otpauth-6c04a",
  storageBucket: "otpauth-6c04a.firebasestorage.app",
  messagingSenderId: "182067264834",
  appId: "1:182067264834:web:5bc2497ad110129c0b1cdb",
  measurementId: "G-9LT332D8E6"
};

// Initialize Firebase (only if it hasn't been initialized already)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
