// Import the necessary Firebase modules
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getClinicalTables } from './util';

// Initialize Firebase app with your configuration
const firebaseConfig = {
    // Your Firebase config here
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export async function getImmunizations(pt) {
    try {
        const docRef = db.collection('patients').doc(pt);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
            const data = snapshot.data();
            if (data && data.metadata && data.metadata.immunizations) {
                return Promise.all(data.metadata.immunizations.map(async (immunizations) => ({
                    name: immunizations.HCPCS || "",
                    dosage: immunizations.date || "",
                    provider: (await getClinicalTables(immunizations.NPI, "npi_org"))[0] || ""
                })));
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return [];
    }
}

export default getImmunizations;