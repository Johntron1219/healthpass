import { getAllPatientData } from '../../patient/Backend/getRecords/getPatientData'; // Import the getAllPatientData function

export async function fetchAuthorizedPatientsData(authorizedPatientIDs) {
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

export default fetchAuthorizedPatientsData;