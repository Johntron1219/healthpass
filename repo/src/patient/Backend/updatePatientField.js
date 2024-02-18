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


const updatePatientField = async (pid, field, value) => {
  try {
      const documentRef = firebase.firestore().collection('patients').doc(pid.toString());
      
      // Check if the document exists before attempting to update it
      const docSnapshot = await documentRef.get();
      if (!docSnapshot.exists) {
          throw new Error('Document does not exist');
      }

      // Proceed with updating the field
      await documentRef.update({
          [field]: value
      });
      console.log('Document field updated successfully');
  } catch (error) {
      console.error('Error updating document field: ', error);
      throw error; // Rethrow the error to handle it in the calling code
  }
};

export { updatePatientField };