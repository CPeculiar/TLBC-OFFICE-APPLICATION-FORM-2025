import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For demo purposes, using environment variables
// In production, you would use your actual Firebase config
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "tlbc-portal-demo.firebaseapp.com",
  projectId: "tlbc-portal-demo",
  storageBucket: "tlbc-portal-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;