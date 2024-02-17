// PatientHomeScreen.js
import React from 'react';

function ProviderHomeScreen({ profile }) {
  return (
    <div className="provider-home">
      <h1>Patient Home</h1>
      <p>Welcome back, {profile.name}!</p>
      {/* Additional content for the provider home screen can be added here */}
    </div>
  );
}

export default ProviderHomeScreen;

