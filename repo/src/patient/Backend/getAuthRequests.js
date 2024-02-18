
import { getAllPatientData } from "./getPatientData"
/* receives list of authorization requests for specific patient */

export const getAuthRequests = async (patientID) => {
    const data = await getAllPatientData(patientID) 
    return data["incomingrequests"]
}