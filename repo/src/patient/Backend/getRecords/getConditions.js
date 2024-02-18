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

export async function getConditions(pt) {
    try {
        const docRef = db.collection('patients').doc(pt);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
            const data = snapshot.data();
            if (data && data.metadata && data.metadata.conditions) {
                const conditions = await Promise.all(data.metadata.conditions.map(async condition => {
                    try {
                        const providerName = (await getClinicalTables(condition.NPI, "npi_org"))[0];
                        console.log("Provider Name:", providerName);
                        return {
                            name: condition.ICD10 || "",
                            provider: providerName || "",
                            date: condition.diagnosisdate || ""
                        };
                    } catch (error) {
                        console.error("Error:", error);
                        return null;
                    }
                }));
                return conditions.filter(condition => condition !== null);
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

export default getConditions;
