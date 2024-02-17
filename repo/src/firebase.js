// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import  'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_NG3Tgcy5BfhLGpNtT5aJSXIxoFj3SXY",
  authDomain: "healthpass123.firebaseapp.com",
  projectId: "healthpass123",
  storageBucket: "healthpass123.appspot.com",
  messagingSenderId: "56776273688",
  appId: "1:56776273688:web:f1fac79cf143b49a7bf86d",
  measurementId: "G-QLMGMGCMKY"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();

