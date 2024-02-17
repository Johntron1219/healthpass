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
    email: "jose.doe@example.com",
    NPI: "1234567890",
  };

  // Placeholder patient profiles
  const patientProfiles = [
    {
      name: "John Doe",
      address: "456 Elm St, Somewhere, CA 67890",
      email: "john.doe@example.com",
      insurancePolicyNumber: "ABC123",
      insurancePlan: "Health Plan A",
      healthConditions: ["Diabetes", "Hypertension"],
      allergies: ["Pollen", "Penicillin"],
      medications: ["Insulin", "Lisinopril"],
      immunization: ["Flu vaccine 2023"],
      labRecords: ["Blood glucose test - 2022/12/31"],
      medicalHistory: ["Appendectomy - 2018"],
      medicalConditions: ["Type 2 Diabetes", "High Blood Pressure"],
      editDates: {
        name: "2024-02-17",
        address: "2024-02-16",
        email: "2024-02-15",
        insurancePolicyNumber: "2024-02-14",
        insurancePlan: "2024-02-13",
        healthConditions: "2024-02-12",
        allergies: "2024-02-11",
        medications: "2024-02-10",
        immunization: "2024-02-09",
        labRecords: "2024-02-08",
        medicalHistory: "2024-02-07",
        medicalConditions: "2024-02-06",
      },
    },
    {
      name: "Jane Smith",
      address: "789 Oak Ave, Nowhere, TX 54321",
      email: "jane.smith@example.com",
      insurancePolicyNumber: "XYZ456",
      insurancePlan: "Health Plan B",
      healthConditions: ["Asthma"],
      allergies: ["Shellfish"],
      medications: ["Albuterol"],
      immunization: ["COVID-19 vaccine - 2024/01/15"],
      labRecords: ["Pulmonary function test - 2023/11/30"],
      medicalHistory: ["Fractured arm - 2021"],
      medicalConditions: ["Asthma"],
      editDates: {
        name: "2024-02-17",
        address: "2024-02-16",
        email: "2024-02-15",
        insurancePolicyNumber: "2024-02-14",
        insurancePlan: "2024-02-13",
        healthConditions: "2024-02-12",
        allergies: "2024-02-11",
        medications: "2024-02-10",
        immunization: "2024-02-09",
        labRecords: "2024-02-08",
        medicalHistory: "2024-02-07",
        medicalConditions: "2024-02-06",
      },
    },
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
