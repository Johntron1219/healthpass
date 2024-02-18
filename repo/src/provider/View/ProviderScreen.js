import React, { useState, useEffect } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from '../../public/DTS.webp';
import getPatientData from '../Backend/getRecords/getPatientData'; // Correct import
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
  const pt = "0002";
  const profile = {
    name: "Jose Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: Pic,
    phone: "12345678",
    email: "jose.doe@example.com",
    NPI: "1234567890",
  };
  const [patientProfiles, setPatientProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientData = await getPatientData(pt, "metadata");
      const conditions = await getConditions(pt);
      const allergies = await getAllergies(pt);
      const medications = await getMedications(pt);
      const procedures = await getProcedures(pt);
      const immunizations = await getImmunizations(pt);
      const labRecords = await getLabRecords(pt);

      const updatedPatientProfile = {
        pt: "0002",
        name: `${patientData.firstname} ${patientData.middlename} ${patientData.lastname}`,
        lastEditDate: "2024-02-17",
        address: `${patientData.address}, ${patientData.city}, ${patientData.state} ${patientData.zip}`,
        dob: `${patientData.monthofbirth}/${patientData.dayofbirth}/${patientData.yearofbirth}`,
        email: patientData.email,
        insurancePolicyNumber: patientData.insurancename,
        insurancePlan: patientData.insurancenum,
        conditions,
        allergies,
        medications,
        procedures,
        immunizations,
        labRecords
      };

      setPatientProfiles([updatedPatientProfile]);
    };

    fetchData();
  }, []);

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
      screenComponent = <ProviderHomeScreen profile={profile} />;
      break;
    case 'profile':
      screenComponent = <ProviderProfileScreen profile={profile} />;
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
      screenComponent = <RequestsScreen providerNPI={providerNPI}/>;
      break;
    default:
      screenComponent = <ProviderHomeScreen profile={profile} />;
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
      <button className ="Home-button" onClick={() => setCurrentScreen('home')}>Logout</button>
    </div>
  );
}

export default ProviderScreen;
