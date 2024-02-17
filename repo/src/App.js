import React, { useState } from 'react';
import './App.css';
import placeholderImage from './placeholder-image.svg';

function App() {
  // State to toggle between different screens
  const [currentScreen, setCurrentScreen] = useState('home');

  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: placeholderImage,
    email: "john.doe@example.com",
    medicalRecords: [],
    insurancePolicyNumber: "XYZ123456789",
    insurancePlan: "Basic Health Plan",
  });

  const [editHistory, setEditHistory] = useState([]);

  const approveProviderAuthorization = () => {
    console.log("Provider authorization approved.");
  };

  const approveMedicalRecordsAccess = () => {
    console.log("Medical records access approved.");
  };

  // Render method for the home screen
  const renderHomeScreen = () => {
    return (
      <div className="home-screen">
        <h1>Welcome to the Health Portal</h1>
        <div className="buttons-container">
          <button onClick={() => setCurrentScreen('patient')}>Patient Side</button>
          <button onClick={() => setCurrentScreen('provider')}>Provider Side</button>
        </div>
      </div>
    );
  };

  // Render method for the patient screen
  const renderPatientScreen = () => {
    return (
      <div className="patient-screen">
        <header className="App-header">
          <img src={profile.photo} className="Profile-photo" alt="profile" />
          <h1>{profile.name}</h1>
          <p>{profile.address}</p>
          <p>{profile.email}</p>
          <section>
            <h2>Medical Records / Authorized Providers</h2>
            {/* Map through medical records and providers here */}
          </section>
          <section>
            <h2>Insurance Policy</h2>
            <p>Policy Number: {profile.insurancePolicyNumber}</p>
            <p>Plan: {profile.insurancePlan}</p>
          </section>
          <section>
            <h2>Edit History</h2>
            {/* Map through edit history here */}
          </section>
          <button onClick={approveProviderAuthorization}>Approve Provider Authorization</button>
          <button onClick={approveMedicalRecordsAccess}>Approve Medical Records Access</button>
        </header>
        <button onClick={() => setCurrentScreen('home')}>Back to Home</button>
      </div>
    );
  };

  // Render method for the provider screen
  const renderProviderScreen = () => {
    // Placeholder content for provider screen
    return (
      <div className="provider-screen">
        <h1>Provider Dashboard</h1>
        {/* Implement provider-specific components here */}
        <button onClick={() => setCurrentScreen('home')}>Back to Home</button>
      </div>
    );
  };

  // Conditional rendering based on the current screen
  switch (currentScreen) {
    case 'home':
      return renderHomeScreen();
    case 'patient':
      return renderPatientScreen();
    case 'provider':
      return renderProviderScreen();
    default:
      return renderHomeScreen();
  }
}

export default App;