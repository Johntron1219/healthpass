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

const addDocumentToCollection = async (collectionName, documentID, data) => {
  try {
    console.log(collectionName, documentID, data)
    const docRef = firestore.collection(collectionName).doc(documentID);
    await docRef.set(data);
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
    authorizedNPIs: [],
    email: email,
    password: password,
    metadata: [],
    firstname: "",
    middlename: "",
    lastname: "",
    monthofbirth: "",
    dayofbirth: "",
    yearofbirth: "",
    address: "",
    city: "",
    state: "",
    ZIP: "",
    insurancename: "",
    insurancenumber: "",
    phone: "",
    sex: "",
    pastNPIs: [{ NPI: "" }],
    medications: [{ NDC: "", dose: "", medNPI: "" }],
    allergies: [{ allergen: "", severity: "", algNPI: "" }],
    conditions: [{ ICD10: "", diagnosisDate: "", dxNPI: "" }],
    procedures: [{ HCPCS: "", date: "", procedureNPI: "" }],
    immunizations: [{ shotname: "", date: "", shotNPI: "" }],
    labrecords: [{ HCPCS: "", value: "", date: "", labNPI: "" }],
  };

  await addDocumentToCollection('patients', pid.toString() ,patientData);

  return patientData;
};

export { createPatient, checkIfDocumentExists };
