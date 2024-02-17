// App.js
import React, { useState } from 'react';
import './App.css';
import placeholderImage from './logo.svg';
import PatientScreen from './PatientScreen';
import ProviderScreen from './ProviderScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderHomeScreen = () => {
    return (
      <div className="home-screen">
        <h1>Welcome to Health Pass</h1>
        <div className="buttons-container">
          <button className="Home-button" onClick={() => setCurrentScreen('patient')}>Patient Side</button>
          <button className="Home-button" onClick={() => setCurrentScreen('provider')}>Provider Side</button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'patient' && <PatientScreen setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'provider' && <ProviderScreen setCurrentScreen={setCurrentScreen} />}
    </div>
  );
}

export default App;
