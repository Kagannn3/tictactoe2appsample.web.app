// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6msjCHiPMVyoV9VK56jCVtVlWWsUSW44",
  authDomain: "tictactoe2appsample.firebaseapp.com",
  projectId: "tictactoe2appsample",
  storageBucket: "tictactoe2appsample.appspot.com",
  messagingSenderId: "900981093087",
  appId: "1:900981093087:web:82958170df388d61faef6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore= getFirestore(app);