import React, { useState, useEffect } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from '../../public/DTS.webp';
import { getProviderData } from '../Backend/getProviderData'; // Import the function to fetch provider data
import { getAllPatientData } from '../Backend/getRecords/getPatientData'; // Correct import
import getConditions from '../Backend/getRecords/getConditions';
import getAllergies from '../Backend/getRecords/getAllergies';
import getMedications from '../Backend/getRecords/getMedications';
import getProcedures from '../Backend/getRecords/getProcedures';
import getImmunizations from '../Backend/getRecords/getImmunizations';
import getLabRecords from '../Backend/getRecords/getLabRecords';
import { updatePatientField } from '../../patient/Backend/updatePatientField';

function ProviderScreen({ setCurrentScreen, providerNPI }) {
  const [providerScreen, setProviderScreen] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [providerProfile, setProviderProfile] = useState(null); // State to store provider profile
  const [patientProfiles, setPatientProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch provider profile
        const providerData = await getProviderData(providerNPI);
        setProviderProfile(providerData);

        // Fetch all patients
        const patientsData = await getAllPatientData();
        
        // Convert the object values into an array of patients
        const patientsArray = Object.values(patientsData);
        
        // Fetch additional data for each patient
        const profiles = await Promise.all(patientsArray.map(async (patient) => {
          // Check if all required properties exist before accessing them
          if (
            patient.metadata &&
            patient.metadata.firstname &&
            patient.metadata.middlename &&
            patient.metadata.lastname &&
            patient.metadata.address &&
            patient.metadata.city &&
            patient.metadata.state &&
            patient.metadata.zip &&
            patient.metadata.monthofbirth &&
            patient.metadata.dayofbirth &&
            patient.metadata.yearofbirth &&
            patient.email &&
            patient.metadata.insurancename &&
            patient.metadata.insurancenum
          ) {
            const conditions = await getConditions(patient.pt);
            const allergies = await getAllergies(patient.pt);
            const medications = await getMedications(patient.pt);
            const procedures = await getProcedures(patient.pt);
            const immunizations = await getImmunizations(patient.pt);
            const labRecords = await getLabRecords(patient.pt);
  
            return {
              pt: patient.pt,
              name: `${patient.metadata.firstname} ${patient.metadata.middlename} ${patient.metadata.lastname}`,
              lastEditDate: "2024-02-17",
              address: `${patient.metadata.address}, ${patient.metadata.city}, ${patient.metadata.state} ${patient.metadata.zip}`,
              dob: `${patient.metadata.monthofbirth}/${patient.metadata.dayofbirth}/${patient.metadata.yearofbirth}`,
              email: patient.email,
              insurancePolicyNumber: patient.metadata.insurancename,
              insurancePlan: patient.metadata.insurancenum,
              conditions,
              allergies,
              medications,
              procedures,
              immunizations,
              labRecords
            };
          } else {
            console.error('Patient data is missing required properties:', patient);
            return null; // Return null for patients with missing properties
          }
        }));
  
        // Filter out null profiles (patients with missing properties)
        const filteredProfiles = profiles.filter(profile => profile !== null);
  
        setPatientProfiles(filteredProfiles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [providerNPI]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setProviderScreen('patientDetail');
  };

  const handleEditPatient = () => {
    setProviderScreen('patientEdit');
  };

  const handleSavePatient = async (updatedPatient) => {
    // Update the local state first
    setPatientProfiles((prevProfiles) => {
      const index = prevProfiles.findIndex(profile => profile.pt === updatedPatient.pt);
      if (index !== -1) {
        const newProfiles = [...prevProfiles];
        newProfiles[index] = updatedPatient;
        return newProfiles;
      }
      return prevProfiles;
    });

    // Update the selectedPatient state to reflect the changes immediately
    setSelectedPatient(updatedPatient);

    // Here you should call a function to update the patient in Firebase
    try {
      // Assuming 'pt' is the patient ID and it is a string. If it's not, you should convert it accordingly.
      await updatePatientField(updatedPatient.pt, updatedPatient);
      console.log('Patient data updated successfully in Firebase');
    } catch (error) {
      console.error('Failed to update patient data in Firebase', error);
    }

    // Go back to the patient detail screen
    setProviderScreen('patientDetail');
  };

  const handleCancelEdit = () => {
    setProviderScreen('patientDetail');
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setProviderScreen('patientList');
  };

  let screenComponent;
  switch (providerScreen) {
    case 'home':
      screenComponent = <ProviderHomeScreen profile={providerProfile} />;
      break;
    case 'profile':
      screenComponent = <ProviderProfileScreen profile={providerProfile} />;
      break;
    case 'patientList':
      screenComponent = <PatientListScreen patientProfiles={patientProfiles} onPatientSelect={handleSelectPatient} />;
      break;
    case 'patientDetail':
      screenComponent = <PatientDetailScreen selectedPatientProfile={selectedPatient} onBackClick={handleBackToList} onEditClick={handleEditPatient} />;
      break;
    case 'patientEdit':
      screenComponent = <PatientEditForm selectedPatientProfile={selectedPatient} onSave={handleSavePatient} onCancel={handleCancelEdit} />;
      break;
    case 'requests':
      screenComponent = <RequestsScreen providerNPI={providerNPI} />;
      break;
    default:
      screenComponent = <ProviderHomeScreen profile={providerProfile} />;
  }

  return (
    <div className="provider-screen">
      {screenComponent}
      <div className="navigation-buttons">
        <button className="Small-blue-button" onClick={() => setProviderScreen('home')}>Home</button>
        <button className="Small-blue-button" onClick={() => setProviderScreen('patientList')}>Patient Edit</button>
        <button className="Small-blue-button" onClick={() => setProviderScreen('profile')}>Profile</button>
        <button className="Small-blue-button" onClick={() => setProviderScreen('requests')}>Requests</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Logout</button>
    </div>
  );
}

export default ProviderScreen;
