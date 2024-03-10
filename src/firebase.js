// Imports
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import{getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABG7t7ZD6ptOPsWfBqEP5coJhx2PCjLh8",
  authDomain: "papercraft-af1e6.firebaseapp.com",
  databaseURL: "https://papercraft-af1e6-default-rtdb.firebaseio.com",
  projectId: "papercraft-af1e6",
  storageBucket: "papercraft-af1e6.appspot.com",
  messagingSenderId: "375489922161",
  appId: "1:375489922161:web:317bdce8d72a694f9e07d0"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig); 
const database = getFirestore(fireApp);

// const userDocument = await database.collection("posts").doc('0zLt6Bx8ajbCkam2oCuX').get()
const auth = getAuth(fireApp);
const provider = new GoogleAuthProvider();

const storage = getStorage(fireApp);


export {
  fireApp,
  database,
  auth,
  provider,
  storage
};

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}