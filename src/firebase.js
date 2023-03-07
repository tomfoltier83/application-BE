// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhn-E4Itk2Gs8HqYR7PGSOK4MjRWvpWTQ",
  authDomain: "be-borne.firebaseapp.com",
  projectId: "be-borne",
  storageBucket: "be-borne.appspot.com",
  messagingSenderId: "556940610882",
  appId: "1:556940610882:web:1f2db920d6ffa1646e8cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore()
