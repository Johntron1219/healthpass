import { database } from '../../firebase';

// Function to retrieve provider data from Firestore based on NPI
export const getProviderData = async (NPI) => {
    try {
        // Assuming NPI is used as the document ID in the 'providers' collection
        const documentRef = database.collection('providers').doc(NPI);
        const documentSnapshot = await documentRef.get();
        
        if (documentSnapshot.exists) {
            console.log('Provider found:', documentSnapshot.data());
            return documentSnapshot.data(); // Returns the provider data as a JSON object
        } else {
            console.log('No provider found with the given NPI');
            return { error: 'No provider found with the given NPI' }; // Returns an error message if NPI doesn't exist
        }
    } catch (error) {
        console.error('Error retrieving provider data:', error);
        return { error: 'Error retrieving provider data' }; // Returns an error message in case of any operation failure
    }
};
