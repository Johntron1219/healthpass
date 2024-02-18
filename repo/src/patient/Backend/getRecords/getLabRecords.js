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

export async function getLabRecords(pt) {
    try {
        const docRef = db.collection('patients').doc(pt);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
            const data = snapshot.data();
            if (data && data.metadata && data.metadata.labrecords) {
                // console.log( await getClinicalTables(data.metadata.labrecords[0].HCPCS, "hcpcs") )
                return await Promise.all(data.metadata.labrecords.map(async (labrecords) => {
                    // ((await getClinicalTables(labrecords.HCPCS, "hcpcs"))[1])
                    return  {
                        name: "test" || "",
                        provider: (await getClinicalTables(labrecords.NPI, "npi_org"))[0] || "",
                        date: labrecords.date || "", 
                        value: labrecords.value || ""
                    }
                }));
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

export default getLabRecords;