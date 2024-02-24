import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABG7t7ZD6ptOPsWfBqEP5coJhx2PCjLh8",
  authDomain: "papercraft-af1e6.firebaseapp.com",
  projectId: "papercraft-af1e6",
  storageBucket: "papercraft-af1e6.appspot.com",
  messagingSenderId: "375489922161",
  appId: "1:375489922161:web:317bdce8d72a694f9e07d0"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig); 
const database = getFirestore(fireApp);

const auth = getAuth(fireApp);
const provider = new GoogleAuthProvider();

export {
  fireApp,
  database,
  auth,
  provider
};
