import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
 const firebaseConfig = {
  apiKey: "AIzaSyDJgDrXI84LqvO9jbmIPTYDfH5Cw4YLFpY",
  authDomain: "dsacracker-4d6bc.firebaseapp.com",
  projectId: "dsacracker-4d6bc",
  storageBucket: "dsacracker-4d6bc.appspot.com",
  messagingSenderId: "920783557291",
  appId: "1:920783557291:web:eea36761b3af395c24ddee",
  measurementId: "G-PEGGJGRKK4"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;


// Import the functions you need from the SDKs you need
