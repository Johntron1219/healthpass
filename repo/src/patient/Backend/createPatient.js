
/* Creates a patient, if patient does not already exist
- input: first name, last name, DOB, address, email, phone
- creates document in MongoDB under patient collection 
*/
import { firestore } from './firebase';

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

const addDocumentToCollection = async (collectionName, data) => {
  try {
    const collectionRef = firestore.collection(collectionName);
    await collectionRef.add(data);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

/* patientData - {email: String, password: String, PID: Number} */

const patient = async (email, password, pid) => {
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
  return patientData;
};

export const createPatient = (patientData) => {

    if (checkIfDocumentExists('patients', patientData.id)) {
        addDocumentToCollection('patients', patientData);
    }
}
