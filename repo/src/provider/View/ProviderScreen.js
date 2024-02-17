// ProviderScreen.js
import React, { useState } from 'react';

function ProviderScreen({ setCurrentScreen }) {
  return (
    <div className="provider-screen">
      <h1>Provider Dashboard</h1>
      
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Home</button>
    </div>
  );
}

export default ProviderScreen;
