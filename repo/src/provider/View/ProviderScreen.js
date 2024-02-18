import React, { useState } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import ProviderPatientEditScreen from './ProviderPatientEditScreen';
import RequestsScreen from './RequestsScreen';
import placeholderImage from './Doctor_Strange_-_Profile.webp';

function ProviderScreen({ setCurrentScreen }) {
  const [providerScreen, setProviderScreen] = useState('home');

  const profile = {
    name: "Jose Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: placeholderImage,
    phone: "12345678",
    email: "jose.doe@example.com",
    NPI: "1234567890",
  };

  // Placeholder patient profiles
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
    // Add additional patient profiles as needed...
  ];

  // Function to handle authorization of patient health records
  const handleAuthorizeRecords = () => {
    console.log("Patient health records authorized.");
    // Implement the logic to authorize patient health records
  };

  const switchScreen = (screen) => {
    setProviderScreen(screen);
  };

  let screen;
  switch (providerScreen) {
    case 'home':
      // Pass the profile as a prop to the ProviderHomeScreen
      screen = <ProviderHomeScreen profile={profile} switchScreen={switchScreen} />;
      break;
    case 'edit':
      // Ensure profile is also passed to ProviderPatientEditScreen
      screen = <ProviderPatientEditScreen patientProfiles={patientProfiles} switchScreen={switchScreen} />;
      break;
    case 'profile':
      // Pass profile to ProviderProfileScreen
      screen = <ProviderProfileScreen profile={profile} />;
      break;
    case 'requests':
      // Placeholder data for Patient Health Record Requests and Requested Medical Records
      const patientHealthRecordRequests = [
        { id: 1, patientName: "John Doe", requestDate: "2024-02-17" },
        { id: 2, patientName: "Jane Smith", requestDate: "2024-02-16" },
      ];
      const requestedMedicalRecords = [
        { id: 1, patientName: "Alice Johnson", requestDate: "2024-02-15" },
        { id: 2, patientName: "Bob Brown", requestDate: "2024-02-14" },
      ];
      screen = <RequestsScreen 
                  patientHealthRecordRequests={patientHealthRecordRequests} 
                  requestedMedicalRecords={requestedMedicalRecords} 
                  onAuthorizeRecords={handleAuthorizeRecords} 
                  onRequestRecords={() => {}} 
                  onCreateShareLink={() => {}} />;
      break;
    default:
      screen = <ProviderHomeScreen profile={profile} switchScreen={switchScreen} />;
      break;
  }

  return (
    <div className="provider-screen">
      {screen}
      <div className="provider-screen-footer">
        <button className="Small-blue-button" onClick={() => switchScreen('home')}>Home</button>
        <button className="Small-blue-button" onClick={() => switchScreen('edit')}>Patient Edit</button>
        <button className="Small-blue-button" onClick={() => switchScreen('profile')}>Profile</button>
        <button className="Small-blue-button" onClick={() => switchScreen('requests')}>Requests</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default ProviderScreen;
