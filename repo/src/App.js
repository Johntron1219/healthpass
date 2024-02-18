// App.js
import React, { useState } from 'react';
import './App.css';
import PatientScreen from './patient/Views/patientScreen';
import ProviderScreen from './provider/View/ProviderScreen';
import LoginPage from './patient/Views/PatientLoginPage';
import logo from './public/Logo.png'; // Import the logo image

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const logoSize = 300; // Adjust the logo size here

  const renderHomeScreen = () => {
    return (
      <div className="home-screen">
        <img src={logo} alt="Health Pass Logo" className="logo" style={{ width: `${logoSize}px`, height: 'auto' }} /> {/* Display the logo with adjustable size */}
        <h1>Welcome to Health Pass</h1>
        <div className="buttons-container">
          <button className="Home-button" onClick={() => setCurrentScreen('patientLogin')}>Login as a Patient</button>
          <button className="Home-button" onClick={() => setCurrentScreen('provider')}>Login as a Provider</button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'patientLogin' && <LoginPage setCurrentScreen={setCurrentScreen}/>}
      {currentScreen === 'patient' && <PatientScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'provider' && <ProviderScreen setCurrentScreen={setCurrentScreen} />}
    </div>
  );
}

export default App;