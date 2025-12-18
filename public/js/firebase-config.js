
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrWnYbWqwgkTS9i6udQIdcCQm_1_pjs70",
  authDomain: "testing-3e80e.firebaseapp.com",
  projectId: "testing-3e80e",
  storageBucket: "testing-3e80e.firebasestorage.app",
  messagingSenderId: "10472503179",
  appId: "1:10472503179:web:ee33070e2257ebbffd618e",
  measurementId: "G-95TM02Q727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
