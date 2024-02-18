import { database } from '../../../firebase'; // Adjust the path as necessary

// Helper function to retrieve value from object by path
const getValueByPath = (object, path) => {
  return path.split('.').reduce((currentObject, key) => {
    return currentObject?.[key];
  }, object);
};

// Function to get all data for a patient
export const getAllPatientData = async (id) => {
    try {
        const documentRef = database.collection('patients').doc(id);
        const documentSnapshot = await documentRef.get();
        
        if (documentSnapshot.exists) {
            return documentSnapshot.data(); // Returns the patient data as a JSON object
        } else {
            throw new Error('No patient found with the given ID'); // Throws an error if ID doesn't exist
        }
    } catch (error) {
        console.error('Error retrieving patient data:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

// Function to get specific data for a patient by path
export const getPatientData = async (pt, path) => {
  try {
    const docRef = database.collection('patients').doc(pt);
    const doc = await docRef.get();

    if (doc.exists) {
      const jsonData = doc.data();
      const value = getValueByPath(jsonData, path);
      if (value === undefined) {
        throw new Error(`Path "${path}" not found in the patient data`);
      }
      return value;
    } else {
      throw new Error('No patient found with the given ID');
    }
  } catch (error) {
    console.error('Error retrieving patient data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export default getPatientData;
