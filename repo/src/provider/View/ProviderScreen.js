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
  useEffect( () =>{
    const fetchData = async () => {
      setPatientProfiles({
        pt: "0002",
        name: await getPatientData(pt, "metadata.firstname") + " " + await getPatientData(pt, "metadata.middlename") + " " + await getPatientData(pt, "metadata.lastname"),
        lastEditDate: "2024-02-17",
        address: await getPatientData(pt, "metadata.address") + ", " + await getPatientData(pt, "metadata.city") + ", " + await getPatientData(pt, "metadata.state") + " " + await getPatientData(pt, "metadata.zip"),
        dob: await getPatientData(pt, "metadata.monthofbirth") + "/" + await getPatientData(pt, "metadata.dayofbirth") + "/" + await getPatientData(pt, "metadata.yearofbirth"),
        email: await getPatientData(pt, "email"),
        insurancePolicyNumber: await getPatientData(pt, "metadata.insurancename"),
        insurancePlan: await getPatientData(pt, "metadata.insurancenum"),
        conditions: await getConditions(pt),
        allergies: await getAllergies(pt),
        medications: await getMedications(pt),
        procedures: await getProcedures(pt),
        immunizations: await getImmunizations(pt),
        labRecords: await getLabRecords(pt)
      });
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

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
