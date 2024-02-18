import {database} from '../../firebase'


export const checkIfDocumentExists = async (providerNPI) => {
    try {
      const docRef = database.collection('providers').doc(providerNPI);
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