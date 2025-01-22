// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxS3keL1cIyE28JkAwN79E7yPFKASoUIw",
  authDomain: "audio-5f40f.firebaseapp.com",
  databaseURL: "https://audio-5f40f-default-rtdb.firebaseio.com",
  projectId: "audio-5f40f",
  storageBucket: "audio-5f40f.appspot.com",
  messagingSenderId: "144487032293",
  appId: "1:144487032293:web:ee0366c9b986dc834ebb0c",
  measurementId: "G-QXTT3G496E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);