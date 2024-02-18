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
function ProviderScreen({ setCurrentScreen }) {
  const [providerScreen, setProviderScreen] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState(null);
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
      const pt = "0002";
      const name = await getPatientData(pt, "metadata.firstname") + " " + await getPatientData(pt, "metadata.middlename") + " " + await getPatientData(pt, "metadata.lastname");
      const address = await getPatientData(pt, "metadata.address") + ", " + await getPatientData(pt, "metadata.city") + ", " + await getPatientData(pt, "metadata.state") + " " + await getPatientData(pt, "metadata.zip");

      const data = {
        name,
        lastEditDate: "2024-02-17",
        address,
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
      };

      return data;
    };

    fetchData().then((data) => {
      setPatientProfiles([data]);
    });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setProviderScreen('patientDetail');
  };

  const handleEditPatient = () => {
    setProviderScreen('patientEdit');
  };

  const handleSavePatient = (updatedPatient) => {
    setPatientProfiles((prevProfiles) => {
      const index = prevProfiles.findIndex(profile => profile.email === updatedPatient.email);
      if (index !== -1) {
        const newProfiles = [...prevProfiles];
        newProfiles[index] = updatedPatient;
        return newProfiles;
      }
      return prevProfiles;
    });

    // Update the selectedPatient state to reflect the changes immediately
    setSelectedPatient(updatedPatient);

    console.log('Patient data saved', updatedPatient);
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
      screenComponent = <RequestsScreen />;
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
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default ProviderScreen;
