import React, { useState, useEffect } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from '../../public/DTS.webp';
import { getAllPatientData } from '../Backend/getRecords/getPatientData'; // Correct import
import getConditions from '../Backend/getRecords/getConditions';
import getAllergies from '../Backend/getRecords/getAllergies';
import getMedications from '../Backend/getRecords/getMedications';
import getProcedures from '../Backend/getRecords/getProcedures';
import getImmunizations from '../Backend/getRecords/getImmunizations';
import getLabRecords from '../Backend/getRecords/getLabRecords';
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
        name: response?.name || "Jose Doe",
        address: response?.address || "123 Main St, Anytown, AN 12345",
        photo: Pic,
        phone: response?.phone || "12345678",
        email: response?.email || "jose.doe@example.com",
        NPI: response?.NPI || "1234567890",
      };
      setProfile(providerProfile);

      const patientsData = await getAllPatientData();
      const patientsArray = Object.values(patientsData);
      const profiles = await Promise.all(patientsArray.map(async (patient) => {
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
          return null;
        }
      }));
      const filteredProfiles = profiles.filter(profile => profile !== null);
      setPatientProfiles(filteredProfiles);
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
