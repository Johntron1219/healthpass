import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const checkIfDocumentExists = async (collectionName, documentId) => {
  try {
    const documentRef = firestore.collection(collectionName).doc(documentId);
    const documentSnapshot = await documentRef.get();
    return documentSnapshot.exists;
  } catch (error) {
    console.error('Error checking document: ', error);
    return false;
  }
};

const addDocumentToCollection = async (collectionName, documentId, data) => {
  try {
    const documentRef = firestore.collection(collectionName).doc(documentId);
    await documentRef.set(data);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const createPatient = async (email, password) => {
  // Generate a random 5-digit number for the PID and document ID
  const pid = Math.floor(10000 + Math.random() * 90000);

  const patientData = {
    PID: pid,
    authorizedNPIs: [null],
    email: email,
    password: password,
    metadata: [null],
    firstname: null,
    middlename: null,
    lastname: null,
    monthofbirth: null,
    dayofbirth: null,
    yearofbirth: null,
    address: null,
    city: null,
    state: null,
    ZIP: null,
    insurancename: null,
    insurancenumber: null,
    phone: null,
    sex: null,
    pastNPIs: [{ NPI: null }],
    medications: [{ NDC: null, dose: null, medNPI: null }],
    allergies: [{ allergen: null, severity: null, algNPI: null }],
    conditions: [{ ICD10: null, diagnosisDate: null, dxNPI: null }],
    procedures: [{ HCPCS: null, date: null, procedureNPI: null }],
    immunizations: [{ shotname: null, date: null, shotNPI: null }],
    labrecords: [{ HCPCS: null, value: null, date: null, labNPI: null }],
  };

  await addDocumentToCollection('patients', pid.toString(), patientData);

  return patientData;
};

export { createPatient, checkIfDocumentExists };
