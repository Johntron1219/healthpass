import firebase from 'firebase/compat/app';

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

const deletePatientField = async (pid, field) => {
    try {
        const documentRef = firebase.firestore().collection('patients').doc(pid.toString());

        // Check if the document exists before attempting to update it
        const docSnapshot = await documentRef.get();
        if (!docSnapshot.exists) {
            throw new Error('Document does not exist'); // Handle the case where the document doesn't exist
        }

        // Proceed with deleting the field
        const fieldValue = {};
        fieldValue[field] = firebase.firestore.FieldValue.delete();
        await documentRef.update(fieldValue);
        console.log('Document field deleted successfully');
    } catch (error) {
        console.error('Error deleting document field: ', error);
    }
};

export { deletePatientField };