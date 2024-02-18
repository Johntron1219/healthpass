import {database} from '../../firebase'
/*

- removes request from patients list of incoming requests
- adds npi to authorized npis

- adds patient to authorized patients on provider 

*/

export const approvePatientHandler = async (NPI, patientID) => {
    try {
        const docRef = database.collection('providers').doc(NPI);
        const doc = await docRef.get();
        if (doc.exists) {
            const array = doc.data()['incomingrequests'];
            const newRequestQueue = array.filter(obj => obj.PID !== patientID);
            const newPatientList = doc.data()['AuthorizedPatients']
            newPatientList.push(patientID)
            await docRef.update({
                incomingrequests: newRequestQueue,
                AuthorizedPatients: newPatientList
            });
        }
      } catch (error) {
        console.error('Error removing value from array:', error);
      }
}

export const denyPatientHandler = async (NPI, patientID) => {

    try {
        const docRef = database.collection('providers').doc(NPI);
        const doc = await docRef.get();
        if (doc.exists) {
            const array = doc.data()['incomingrequests'];
            const newRequestQueue = array.filter(obj => obj.PID !== patientID);
            await docRef.update({
                incomingrequests: newRequestQueue,
            });
        }
      } catch (error) {
        console.error('Error removing value from array:', error);
      }
    
}

export const initiateRequestHandler = async (NPI, patientID) => {
  try {
    // get provider request data
    // if patient id inside of provider list, return 'request already sent'
    // append patient id, name, and time of request to provider request queue
    // update the provider document with the new patient data
    const docRef = database.collection('patients').doc(patientID);
    const doc = await docRef.get();
    if (doc.exists) {
        const requestQueue = doc.data()['incomingrequests'];
        if (!requestQueue || requestQueue.filter(obj => obj.NPI === NPI).length === 0) {
            const currentDate = new Date();
            const timestamp = currentDate.toLocaleDateString();
            const reqObj = {
            NPI: NPI,
            providerName: 'billy',
            requestDate: timestamp,
            }
            requestQueue.push(reqObj)
            await docRef.update({
            incomingrequests: requestQueue,
        });
        } else {
          console.log('authorization request already sent')
        }
    }
  } catch (error) {
    console.error('Error removing value from array:', error);
  }
}

export const removeAuthorizationHandler = async (NPI, patientID) => {
  try {
    const docRef = database.collection('providers').doc(NPI);
    const doc = await docRef.get();
    if (doc.exists) {
        const array = doc.data()['AuthorizedPatients'];
        const newPatientList = array.filter(obj => obj !== patientID);
        await docRef.update({
            AuthorizedPatients: newPatientList
        });
    }
  } catch (error) {
    console.error('Error removing value from array:', error);
  }
}