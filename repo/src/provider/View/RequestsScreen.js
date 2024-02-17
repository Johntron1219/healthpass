// RequestsScreen.js
import React from 'react';

function RequestsScreen({ onAuthorizePatient, onRequestRecords }) {
  // Function to handle provider authorization approval
  const handleAuthorizePatient = () => {
    console.log("Patient authorized.");
    if (onAuthorizePatient) onAuthorizePatient();
    // Further logic to approve provider authorization can be added here
  };

  // Function to handle medical records access approval
  const handleRequestRecords = () => {
    console.log("Requested patient records.");
    if (onRequestRecords) onRequestRecords();
    // Further logic to approve pulling medical records can be added here
  };

  return (
    <div className="requests-screen">
      <h1>Approvals</h1>
      <div className="requests-buttons">
        <button className="A-pink-button" onClick={handleAuthorizePatient}>Authorize Patient Data</button>
        <button className="A-pink-button" onClick={handleRequestRecords}>Request Patient Records</button>
      </div>
    </div>
  );
}

export default RequestsScreen;

