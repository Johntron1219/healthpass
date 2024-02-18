import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const updatePatientField = async (pid, field, value) => {
  try {
    const documentRef = firestore.collection('patients').doc(pid.toString());
    await documentRef.update({
      [field]: value
    });
    console.log('Document field updated successfully');
  } catch (error) {
    console.error('Error updating document field: ', error);
  }
};

export { updatePatientField };