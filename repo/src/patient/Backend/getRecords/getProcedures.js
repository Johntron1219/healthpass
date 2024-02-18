// Import the necessary Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getProviderNameByNPI } from './util';


// Initialize Firebase app with your configuration
const firebaseConfig = {
    // Your Firebase config here
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export async function getProcedures(pt) {
    try {
        const docRef = db.collection('patients').doc(pt);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
            const data = snapshot.data();
            if (data && data.metadata && data.metadata.procedures) {
                return await Promise.all(data.metadata.procedures.map(async (procedures) => ({
                    name: procedures.HCPCS || "",
                    dosage: procedures.dosage || "",
                    provider: (await getProviderNameByNPI(procedures.NPI)) || ""
                })));
            } else {
                console.log("No conditions data found for the patient.");
                return [];
            }
        } else {
            console.log("Document does not exist");
            return [];
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return [];
    }
}

export default getProcedures;