// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT8sBhhDufSBLkZeVu2JC_J1W12Ys9RgQ",
  authDomain: "voiceit-e8407.firebaseapp.com",
  projectId: "voiceit-e8407",
  storageBucket: "voiceit-e8407.appspot.com",
  messagingSenderId: "279927713898",
  appId: "1:279927713898:web:83f23837aa805b38d8da13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()

export default storage