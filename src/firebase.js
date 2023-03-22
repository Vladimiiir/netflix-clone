// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  // collection,
  // query,
  // where,
  // getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApc2VMYqenxbwb6oTCKSe5mjVj0qhU54U",
  authDomain: "netflix-clone-30af0.firebaseapp.com",
  projectId: "netflix-clone-30af0",
  storageBucket: "netflix-clone-30af0.appspot.com",
  messagingSenderId: "137227164345",
  appId: "1:137227164345:web:517b949d6c21dd1f779968",
  measurementId: "G-6LDWCVWH2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
