import { firestore } from './firebase';

// Function to check if a document exists in a Firestore collection
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

// Function to add a document to a Firestore collection
const addDocumentToCollection = async (collectionName, data) => {
  try {
    const collectionRef = firestore.collection(collectionName);
    await collectionRef.add(data);
    console.log('Document added successfully');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Function to create a provider if they do not already exist in the Firestore database
export const createProvider = async (providerData) => {
    const exists = await checkIfDocumentExists('providers', providerData.id);
    if (!exists) {
        await addDocumentToCollection('providers', providerData);
    } else {
        console.log('Provider already exists.');
    }
};
