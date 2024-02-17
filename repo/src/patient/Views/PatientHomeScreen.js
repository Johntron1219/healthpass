// PatientHomeScreen.js
import React from 'react';

function PatientHomeScreen({ profile }) {
  return (
    <div className="patient-home">
      <h1>Patient Home</h1>
      <p>Welcome back, {profile.name}!</p>
      {/* Additional content for the patient home screen can be added here */}
    </div>
  );
}

export default PatientHomeScreen;

