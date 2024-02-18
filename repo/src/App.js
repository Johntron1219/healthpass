// App.js
import React, { useState } from 'react';
import './App.css';
import PatientScreen from './patient/Views/patientScreen';
import ProviderScreen from './provider/View/ProviderScreen';
import ProviderLoginPage from './provider/View/ProviderLoginPage';
import LoginPage from './patient/Views/PatientLoginPage';
import PatientRegisterPage from './patient/Views/PatientRegisterPage';
import logo from './public/Logo.png'; // Import the logo image

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const [currentID, setCurrentID] = useState(null);

  const renderHomeScreen = () => {
    return (
      <div className="home-screen">
        <div className="logo-container">
          <img src={logo} alt="Health Pass Logo" className="logo" />
        </div>
        <h1 className="welcome-text">Welcome to Health Pass</h1>
        <p className="tagline">Making personal health data transfer seamless and secure.</p>
        <div className="buttons-container">
          <button className="login-button patient" onClick={() => setCurrentScreen('patientLogin')}>
            Login as a Patient
          </button>
          <button className="login-button provider" onClick={() => setCurrentScreen('providerLogin')}>
            Login as a Provider
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'patientLogin' && <LoginPage setCurrentScreen={setCurrentScreen} setCurrentID={setCurrentID}/>}
      {currentScreen === 'providerLogin' && <ProviderLoginPage setCurrentScreen={setCurrentScreen} setCurrentID={setCurrentID}/>}
      {currentScreen === 'provider' && <ProviderScreen setCurrentScreen={setCurrentScreen} providerNPI={currentID}/>}
      {currentScreen === 'patient' && <PatientScreen setCurrentScreen={setCurrentScreen} patientID={currentID} />}
      {currentScreen === 'patientRegister' && <PatientRegisterPage setCurrentScreen={setCurrentScreen}/>}
    </div>
  );
}

export default App;