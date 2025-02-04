import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For database (if needed)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaiLB2p1vjDF6VpjzsQVPzlcpF9XAO6GI",
  authDomain: "testmaster-5e698.firebaseapp.com",
  projectId: "testmaster-5e698",
  storageBucket: "testmaster-5e698.firebasestorage.app",
  messagingSenderId: "24891136367",
  appId: "1:24891136367:web:4c2eff56bd8b4f8b0ef09a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore (if needed)

export { auth, db }; // Export auth and db
