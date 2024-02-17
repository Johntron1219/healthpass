// ProviderScreen.js
import React, { useState } from 'react';
import ProviderHomeScreen from './ProviderHomeScreen';
import ProviderProfileScreen from './ProviderProfileScreen';
import ProviderPatientEditScreen from './ProviderPatientEditScreen';
import RequestsScreen from './RequestsScreen';
import placeholderImage from './Doctor_Strange_-_Profile.webp'
import './Provider.css'; // Assuming a separate CSS file for provider styles

function ProviderScreen({ setCurrentScreen }) {
  const [providerScreen, setProviderScreen] = useState('home');

  const profile = {
    name: "Jose Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: placeholderImage,
    email: "jose.doe@example.com",
    NPI: "1234567890", // Assuming NPI is needed for the profile
  };

  const switchScreen = (screen) => {
    setProviderScreen(screen);
  };

  let screen;
  switch (providerScreen) {
    case 'home':
      screen = <ProviderHomeScreen switchScreen={switchScreen} />;
      break;
    case 'edit':
      screen = <ProviderPatientEditScreen profile={profile} switchScreen={switchScreen} />;
      break;
    case 'profile':
      screen = <ProviderProfileScreen profile={profile} />;
      break;
    case 'requests':
      screen = <RequestsScreen />;
      break;
    default:
      screen = <ProviderHomeScreen switchScreen={switchScreen} />;
      break;
  }

  return (
    <div className="provider-screen">
      {screen}
      <div className="provider-screen-footer">
        <button className="small-blue-button" onClick={() => switchScreen('home')}>Home</button>
        <button className="small-blue-button" onClick={() => switchScreen('edit')}>Patient Edit</button>
        <button className="small-blue-button" onClick={() => switchScreen('profile')}>Profile</button>
        <button className="small-blue-button" onClick={() => switchScreen('requests')}>Requests</button>
      </div>
      <button className="home-button" onClick={() => setCurrentScreen('main')}>Back to Main Home</button>
    </div>
  );
}

export default ProviderScreen;
