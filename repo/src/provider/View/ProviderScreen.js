// ProviderScreen.js
import React, { useState } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from './DTS.webp'

function ProviderScreen({ setMainScreen }) { // Renamed prop to avoid conflict
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const profile = {
    name: "Jose Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: Pic,
    phone: "12345678",
    email: "jose.doe@example.com",
    NPI: "1234567890",
  };

  const patientProfiles = [
    {
      name: "John Doe",
      lastEditDate: "2024-02-17",
      dob: "1980-02-18",
      address: "123 Main St, Anytown, AN 12345",
      email: "john.doe@example.com",
      insurancePolicyNumber: "XYZ123456789",
      insurancePlan: "Basic Health Plan",
      conditions: [
        {
          name: "Hypertension",
          provider: "Dr. Smith",
          date: "2023-01-15"
        }
      ],
      allergies: [
        {
          name: "Pollen",
          severity: "Mild",
          provider: "Dr. Johnson"
        }
      ],
      medications: [
        {
          name: "Lisinopril",
          dosage: "10 mg",
          provider: "Dr. Smith"
        }
      ],
      procedures: [
        {
          name: "Appendectomy",
          date: "2015-05-20",
          provider: "Dr. Brown"
        }
      ],
      immunizations: [
        {
          name: "Influenza",
          date: "2022-10-01",
          provider: "Dr. Lee"
        }
      ],
      labRecords: [
        {
          name: "CBC",
          value: "Normal",
          date: "2024-01-10",
          provider: "LabCorp"
        },
        {
          name: "Cholesterol",
          value: "Slightly High",
          date: "2023-12-15",
          provider: "Quest Diagnostics"
        }
      ]
    },
    {
      name: "Jane Smith",
      lastEditDate: "2024-02-16",
      dob: "1985-08-25",
      address: "456 Oak St, Somecity, AN 23456",
      email: "jane.smith@example.com",
      insurancePolicyNumber: "XYZ987654321",
      insurancePlan: "Premium Health Plan",
      conditions: [
        {
          name: "Asthma",
          provider: "Dr. Adams",
          date: "2023-02-20"
        }
      ],
      allergies: [
        {
          name: "Shellfish",
          severity: "Severe",
          provider: "Dr. Carter"
        }
      ],
      medications: [
        {
          name: "Albuterol",
          dosage: "2 puffs",
          provider: "Dr. Adams"
        }
      ],
      procedures: [
        {
          name: "Tonsillectomy",
          date: "2019-03-30",
          provider: "Dr. Baker"
        }
      ],
      immunizations: [
        {
          name: "COVID-19 Vaccine",
          date: "2024-01-15",
          provider: "Dr. Lee"
        }
      ],
      labRecords: [
        {
          name: "Pulmonary Function Test",
          value: "Normal",
          date: "2023-11-30",
          provider: "Respiratory Center"
        }
      ]
    }
  ];

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('patientDetail');
  };

  const handleEditPatient = () => {
    setCurrentScreen('patientEdit');
  };

  const handleSavePatient = (updatedPatient) => {
    // Here you should update the patient's data in your state or database
    console.log('Patient data saved', updatedPatient);
    setCurrentScreen('patientDetail');
  };

  const handleCancelEdit = () => {
    setCurrentScreen('patientDetail');
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setCurrentScreen('patientList');
  };

  let screenComponent;
  switch (currentScreen) {
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
      screenComponent = <RequestsScreen 
        // ... props for RequestsScreen
      />;
      break;
    default:
      screenComponent = <ProviderHomeScreen profile={profile} />;
  }

  return (
    <div className="provider-screen">
      {screenComponent}
      <div className="navigation-buttons">
        <button onClick={() => setCurrentScreen('home')}>Home</button>
        <button onClick={() => setCurrentScreen('patientList')}>Patient Edit</button>
        <button onClick={() => setCurrentScreen('profile')}>Profile</button>
        <button onClick={() => setCurrentScreen('requests')}>Requests</button>
      </div>
      <button className="Home-button" onClick={() => setMainScreen('home')}>Back to Main Home</button> {/* Use setMainScreen here */}
    </div>
  );
}

export default ProviderScreen;
