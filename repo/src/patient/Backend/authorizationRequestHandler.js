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
            const array = doc.data()['incomingrequests'];
            const newRequestQueue = array.filter(obj => obj.NPI !== NPI);
            const newNPIs = doc.data()['AuthorizedNPIs']
            newNPIs.push(NPI)
            await docRef.update({
                incomingrequests: newRequestQueue,
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
            const array = doc.data()['incomingrequests'];
            const newRequestQueue = array.filter(obj => obj.NPI !== NPI);
            await docRef.update({
                incomingrequests: newRequestQueue,
            });
        }
      } catch (error) {
        console.error('Error removing value from array:', error);
      }
    
}

export const initiateRequestHandler = async (patientID, NPI) => {
  try {
    // get provider request data
    // if patient id inside of provider list, return 'request already sent'
    // append patient id, name, and time of request to provider request queue
    // update the provider document with the new patient data
    const docRef = database.collection('providers').doc(NPI);
    const doc = await docRef.get();
    if (doc.exists) {
        const requestQueue = doc.data()['incomingrequests'];
        if (!requestQueue || requestQueue.filter(obj => obj.PID === patientID).length === 0) {
          const currentDate = new Date();
          const timestamp = currentDate.toLocaleDateString();
          const reqObj = {
            PID: patientID,
            patientName: 'sarah',
            requestDate: timestamp
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

export const removeAuthorizationHandler = async (patientID, NPI) => {
  try {
    const docRef = database.collection('patients').doc(patientID);
    const doc = await docRef.get();
    if (doc.exists) {
        const array = doc.data()['AuthorizedNPIs'];
        const newProviderList = array.filter(obj => obj !== NPI);
        await docRef.update({
            AuthorizedNPIs: newProviderList
        });
    }
  } catch (error) {
    console.error('Error removing value from array:', error);
  }
}