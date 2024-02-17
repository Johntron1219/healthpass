
/* Showcases the base view after the patient has logged in
- shows different medical record categories to select on
- once category is selected, drop down will expand 
*/

// PatientScreen.js
import React, { useState } from 'react';
import placeholderImage from './logo.svg';
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
    medicalRecords: [],
    insurancePolicyNumber: "XYZ123456789",
    insurancePlan: "Basic Health Plan",
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
      screen = <ApprovalsScreen />;
      break;
    default:
      screen = <PatientHomeScreen profile={profile} />;
      break;
  }

  return (
    <div className="patient-screen">
      {screen}
      <div className="patient-screen-footer">
        <button className="Footer-button" onClick={() => setPatientScreen('home')}>Home</button>
        <button className="Footer-button" onClick={() => setPatientScreen('profile')}>Profile</button>
        <button className="Footer-button" onClick={() => setPatientScreen('approvals')}>Approvals</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default PatientScreen;
