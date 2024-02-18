import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const deletePatientField = async (pid, field) => {
    try {
      const documentRef = firestore.collection('patients').doc(pid.toString());
      const fieldValue = {};
      fieldValue[field] = firestore.FieldValue.delete();
      await documentRef.update(fieldValue);
      console.log('Document field deleted successfully');
    } catch (error) {
      console.error('Error deleting document field: ', error);
    }
  };

export { deletePatientField };