import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC_NG3Tgcy5BfhLGpNtT5aJSXIxoFj3SXY",
    authDomain: "healthpass123.firebaseapp.com",
    projectId: "healthpass123",
    storageBucket: "healthpass123.appspot.com",
    messagingSenderId: "56776273688",
    appId: "1:56776273688:web:f1fac79cf143b49a7bf86d",
    measurementId: "G-QLMGMGCMKY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const addPatientField = async (pid, field, value) => {
    try {
      const documentRef = firestore.collection('patients').doc(pid.toString());
      const fieldValue = {};
      fieldValue[field] = value; // Assign the value you want to set for the field
      await documentRef.update(fieldValue);
      console.log('Document field added successfully');
    } catch (error) {
      console.error('Error adding document field: ', error);
    }
  };
  
  export { addPatientField };