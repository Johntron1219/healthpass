import {getAllPatientData} from "./getPatientData"
import {database} from '../../firebase'
/*

- removes request from patients list of incoming requests
- adds npi to authorized npis

- adds patient to authorized patients on provider 

*/

export const approveProviderHandler = async (patientID, NPI) => {
    try {
        const docRef = database.collection('patients').doc(patientID);
        const doc = await docRef.get();
        if (doc.exists) {
            const array = doc.data()['incomingauthrequests'];
            const newRequestQueue = array.filter(obj => obj.NPI !== NPI);
            const newNPIs = doc.data()['AuthorizedNPIs']
            newNPIs.push(NPI)
            await docRef.update({
                incomingauthrequests: newRequestQueue,
                AuthorizedNPIs: newNPIs
            });
        }
      } catch (error) {
        console.error('Error removing value from array:', error);
      }
}

export const denyProviderHandler = async (patientID, NPI) => {

    try {
        const docRef = database.collection('patients').doc(patientID);
        const doc = await docRef.get();
        if (doc.exists) {
            const array = doc.data()['incomingauthrequests'];
            const newRequestQueue = array.filter(obj => obj.NPI !== NPI);
            await docRef.update({
                incomingauthrequests: newRequestQueue,
            });
        }
      } catch (error) {
        console.error('Error removing value from array:', error);
      }
    
}