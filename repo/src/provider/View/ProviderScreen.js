import React, { useState } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import PatientListScreen from './PatientListScreen';
import PatientDetailScreen from './PatientDetailScreen';
import PatientEditForm from './PatientEditForm';
import RequestsScreen from './RequestsScreen';
import Pic from '../../public/DTS.webp';

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
  const [patientProfiles, setPatientProfiles] = useState([
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
    }, 
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
  ]);

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
        <button className ="Small-blue-button" onClick={() => setProviderScreen('home')}>Home</button>
        <button className ="Small-blue-button" onClick={() => setProviderScreen('patientList')}>Patient Edit</button>
        <button className ="Small-blue-button" onClick={() => setProviderScreen('profile')}>Profile</button>
        <button className ="Small-blue-button" onClick={() => setProviderScreen('requests')}>Requests</button>
      </div>
      <button className ="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default ProviderScreen;