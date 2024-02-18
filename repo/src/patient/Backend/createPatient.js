
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

/* patient data - 

*/

export const createPatient = (patientData) => {

    if (checkIfDocumentExists('patients', patientData.id)) {
        addDocumentToCollection('patients', patientData);
    }
}
