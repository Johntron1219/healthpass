import { getAllPatientData } from './path/to/getAllPatientData'; // Import the getAllPatientData function

async function fetchAuthorizedPatientsData(authorizedPatientIDs) {
    const patientDataList = [];

    // Iterate through the list of authorized patient IDs
    for (const patientID of authorizedPatientIDs) {
        try {
            // Call getAllPatientData for each patient ID
            const patientData = await getAllPatientData(patientID);
            // Push the retrieved patient data into the patientDataList
            patientDataList.push(patientData);
        } catch (error) {
            // Handle errors, if any, during the retrieval process
            console.error(`Error fetching data for patient with ID ${patientID}:`, error);
        }
    }

    return patientDataList; // Return the list of patient data
}