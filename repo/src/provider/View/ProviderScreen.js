// ProviderScreen.js

import React, { useState } from 'react';
import placeholderImage from './logo.svg';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import RequestsScreen from './RequestsScreen';

function ProviderScreen({ setCurrentScreen }) {
  const [providerScreen, setProviderScreen] = useState('home');

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
  switch (providerScreen) {
    case 'home':
      screen = <ProviderHomeScreen profile={profile} />;
      break;
    case 'profile':
      screen = <ProviderProfileScreen profile={profile} />;
      break;
    case 'approvals':
      screen = <RequestsScreen/>;
      break;
    default:
      screen = <ProviderHomeScreen profile={profile} />;
      break;
  }

  return (
    <div className="provider-screen">
      {screen}
      <div className="provider-screen-footer">
        <button className="Small-blue-button" onClick={() => setProviderScreen('home')}>Home</button>
        <button className="Small-blue-button" onClick={() => setProviderScreen('profile')}>Profile</button>
        <button className="Small-blue-button" onClick={() => setProviderScreen('approvals')}>Approvals</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default ProviderScreen;
