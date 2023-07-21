import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCAax51Yd1mPhl-NoNcRgLy9g5KhOaO944",
  authDomain: "student-management-ce07f.firebaseapp.com",
  projectId: "student-management-ce07f",
  storageBucket: "student-management-ce07f.appspot.com",
  messagingSenderId: "264798726630",
  appId: "1:264798726630:web:ca6b11ce874b3cd0320e27",
  measurementId: "G-EGWETENLMZ"
};

const app = initializeApp(firebaseConfig);

export const db =getFirestore(app)
export const Auth = getAuth(app)
export const storage = getStorage(app)