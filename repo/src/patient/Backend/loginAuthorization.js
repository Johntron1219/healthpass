import {database} from '../../firebase'


export const checkIfDocumentExists = async (patientID) => {
    try {
      const docRef = database.collection('patients').doc(patientID);
      const doc = await docRef.get();
      if (doc.exists) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error checking document:', error);
    }
  };