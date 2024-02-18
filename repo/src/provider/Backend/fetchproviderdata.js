import { database } from '../../firebase'; // Adjust the path as necessary

export const getAllProviderData = async (id) => {
    try {
        // Assuming NPI is used as the document ID in the 'providers' collection
        const documentRef = database.collection('patients').doc(id);
        const documentSnapshot = await documentRef.get();
        
        if (documentSnapshot.exists) {
            return documentSnapshot.data(); // Returns the provider data as a JSON object
        } else {
            return { error: 'No provider found with the given NPI' }; // Returns an error message if NPI doesn't exist
        }
    } catch (error) {
        return { error: 'Error retrieving provider data' }; // Returns an error message in case of any operation failure
    }
};

const fetchproviderdata = async (npi, path) => {
  const docRef = database.collection('providers').doc(npi);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      const jsonData = doc.data();
      console.log(jsonData)
      const value = getValueByPath(jsonData, path);
      return value;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.log('Error getting document:', error);
    return null;
  }
};

const getValueByPath = (object, path) => {
  const keys = path.split('.');
  let value = object;
  keys.forEach((key) => {
    if (value && key in value) {
      value = value[key];
    } else {
      value = null;
    }
  });
  return value;
};

export default fetchproviderdata;
