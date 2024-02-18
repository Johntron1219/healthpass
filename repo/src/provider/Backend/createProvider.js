import { database } from '../../firebase';

// Function to check if a document exists in a Firestore collection
const checkIfDocumentExists = async (collectionName, documentId) => {
    try {
      const documentRef = database.collection(collectionName).doc(documentId);
      const documentSnapshot = await documentRef.get();
      return documentSnapshot.exists;
    } catch (error) {
      console.error('Error checking document: ', error);
      return false;
    }
  };

// Function to add a document to a Firestore collection
const addDocumentToCollection = async (collectionName, documentID, data) => {
  try {
    const docRef = database.collection(collectionName).doc(documentID);
    await docRef.set(data);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const createProvider = async (providerNPI, password) => {
  const providerData = {
    NPI: providerNPI,
    password: password,
    incomingrequests: [],
    AuthorizedPatients: [],
  };

  await addDocumentToCollection('providers', providerNPI, providerData);

  return providerData;
};

export { createProvider, checkIfDocumentExists };
