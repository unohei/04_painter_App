import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "eden-app-20251210.firebaseapp.com",
  projectId: "eden-app-20251210",
  storageBucket: "eden-app-20251210.firebasestorage.app",
  messagingSenderId: "338759719542",
  appId: "1:338759719542:web:9330f0e5d85e45db6e1d57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
