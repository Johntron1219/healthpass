import React, { useState, useEffect } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from '../../public/DTS.webp';
import { getProviderData } from '../Backend/getProviderData';
import { updatePatientField } from '../../patient/Backend/updatePatientField';

function ProviderScreen({ setCurrentScreen, providerNPI }) {
  const [providerScreen, setProviderScreen] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [profile, setProfile] = useState(null);
  const [patientProfiles, setPatientProfiles] = useState([]);

  useEffect(() => {
    fetchData(providerNPI);
  }, [providerNPI]);

  const fetchData = async (NPI) => {
    try {
      const response = await getProviderData(NPI);
      const providerProfile = {
        name: response.name,
        photo: Pic,
        NPI: response.NPI,
        password: response.password,
        incomingrequests: response.incomingrequests,
        AuthorizedPatients: response.AuthorizedPatients,
      };

      setProfile(providerProfile);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setProviderScreen('patientDetail');
  };

  const handleEditPatient = () => {
    setProviderScreen('patientEdit');
  };

  const handleSavePatient = async (updatedPatient) => {
    setPatientProfiles((prevProfiles) => {
      const index = prevProfiles.findIndex(profile => profile.pt === updatedPatient.pt);
      if (index !== -1) {
        const newProfiles = [...prevProfiles];
        newProfiles[index] = updatedPatient;
        return newProfiles;
      }
      return prevProfiles;
    });

    setSelectedPatient(updatedPatient);

    try {
      await updatePatientField(updatedPatient.pt, updatedPatient);
      console.log('Patient data updated successfully in Firebase');
    } catch (error) {
      console.error('Failed to update patient data in Firebase', error);
    }

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
      screenComponent = <PatientListScreen providerProfile={profile} patientProfiles={patientProfiles} onPatientSelect={handleSelectPatient} setPatientProfiles={setPatientProfiles}/>;
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
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Logout</button>
    </div>
  );
}

export default ProviderScreen;
