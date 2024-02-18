import {database} from '../../firebase';


export const savePatientEdits = async (pid, profile) => {
    console.log(profile);
    const documentRef = database.collection('patients').doc(pid.toString());
    // Check if the document exists before attempting to update it
    const patientData = {
    PID: profile.PID,
    name: profile.name,
    email: profile.email,
    password: profile.password,
    DOB: profile.DOB,
    authorizedNPIs: profile.authorizedNPIs,
    incomingrequests: profile.incomingrequests,
    metadata: {
        pastNPIs: profile.metadata.pastNPIs,
        medications: profile.metadata.medications,
        allergies: profile.metadata.allergies,
        conditions: profile.metadata.conditions,
        procedures: profile.metadata.procedures,
        immunizations: profile.metadata.immunizations,
        labrecords: profile.metadata.labrecords,
        },
    };

    console.log(patientData);
    const docSnapshot = await documentRef.set(patientData);
    console.log('Document field updated successfully')
};