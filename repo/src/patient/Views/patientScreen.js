// PatientScreen.js
import React, { useState } from 'react';
import placeholderImage from './Elf.webp';
import PatientHomeScreen from './PatientHomeScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ApprovalsScreen from './ApprovalsScreen';

function PatientScreen({ setCurrentScreen }) {
  const [patientScreen, setPatientScreen] = useState('home');

  const profile = {
    name: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: placeholderImage,
    email: "john.doe@example.com",
    healthConditions: ["Hypertension"],
    allergies: ["Pollen"],
    medications: ["Lisinopril"],
    immunization: ["Influenza"],
    labRecords: ["CBC: Normal", "Cholesterol: Slightly High"],
    medicalHistory: ["Appendectomy: 2015"],
    medicalConditions: ["Asthma"],
    insurancePolicyNumber: "XYZ123456789",
    insurancePlan: "Basic Health Plan",
    // Including edit dates for each profile item
    editDates: {
      name: "2024-02-01",
      address: "2024-02-02",
      email: "2024-02-03",
      healthConditions: "2024-02-04",
      allergies: "2024-02-05",
      medications: "2024-02-06",
      immunization: "2024-02-07",
      labRecords: "2024-02-08",
      medicalHistory: "2024-02-09",
      medicalConditions: "2024-02-10",
      insurancePolicy: "2024-02-11"
    }
  };

  // Placeholder data for provider authorization requests and past medical record access approvals
  const providerAuthorizationRequests = [
    { id: 1, providerName: "Dr. Smith", requestDate: "2024-02-15" },
    { id: 2, providerName: "Dr. Johnson", requestDate: "2024-02-14" }
  ];

  const pastMedicalRecordAccessApprovals = [
    { id: 1, patientName: "John Doe", approvalDate: "2023-12-01" },
    { id: 2, patientName: "Jane Doe", approvalDate: "2023-11-25" }
  ];

  // Functions to handle approvals and creating access links
  const handleApproveProvider = () => {
    console.log("Approving provider...");
  };

  const handleApproveRecords = () => {
    console.log("Approving records access...");
  };

  const handleCreateAccessLink = () => {
    console.log("Creating access link...");
  };

  let screen;
  switch (patientScreen) {
    case 'home':
      screen = <PatientHomeScreen profile={profile} />;
      break;
    case 'profile':
      screen = <PatientProfileScreen profile={profile} />;
      break;
    case 'approvals':
      screen = <ApprovalsScreen 
                providerAuthorizationRequests={providerAuthorizationRequests} 
                pastMedicalRecordAccessApprovals={pastMedicalRecordAccessApprovals}
                onApproveProvider={handleApproveProvider} 
                onApproveRecords={handleApproveRecords} 
                onCreateAccessLink={handleCreateAccessLink}
                />;
      break;
    default:
      screen = <PatientHomeScreen profile={profile} />;
      break;
  }

  return (
    <div className="patient-screen">
      {screen}
      <div className="patient-screen-footer">
        <button className="Small-blue-button" onClick={() => setPatientScreen('home')}>Home</button>
        <button className="Small-blue-button" onClick={() => setPatientScreen('profile')}>Profile</button>
        <button className="Small-blue-button" onClick={() => setPatientScreen('approvals')}>Approvals</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default PatientScreen;
