// RequestsScreen.js
import React from 'react';

function RequestsScreen({ 
    patientHealthRecordRequests = [], // Provide default empty array
    requestedMedicalRecords = [], // Provide default empty array
    onAuthorizeRecords, 
    onRequestRecords, 
    onCreateShareLink 
}) {
  // Function to handle authorization of patient health records
  const handleAuthorizeRecords = () => {
    console.log("Patient health records authorized.");
    if (onAuthorizeRecords) onAuthorizeRecords(); // Invoke passed function to authorize records
  };

  // Function to handle requesting medical records from patients
  const handleRequestRecords = () => {
    console.log("Medical records requested from patients.");
    if (onRequestRecords) onRequestRecords(); // Invoke passed function to request records
  };

  // Function to handle creation of share link for patients
  const handleCreateShareLink = () => {
    console.log("Share link for patients created.");
    if (onCreateShareLink) onCreateShareLink(); // Invoke passed function to create share link
  };

  return (
    <div className="requests-screen">
      <h1>Requests</h1>
      <div className="request-item">
        <h2>Patient Health Record Requests</h2>
        {patientHealthRecordRequests.map((request) => (
          <div key={request.id} className="request-item">
            {request.patientName} - {request.requestDate}
          </div>
        ))}
      </div>
      <button className="A-pink-button" onClick={handleAuthorizeRecords}>Authorize Patient Health Records</button>
      
      <div className="request-item">
        <h2>Requested Medical Records</h2>
        {requestedMedicalRecords.map((record) => (
          <div key={record.id} className="approval-history-item">
            {record.patientName} - {record.requestDate}
          </div>
        ))}
      </div>
      <button className="A-pink-button" onClick={handleRequestRecords}>Request Medical Records</button>
      
      <button className="A-pink-button" onClick={handleCreateShareLink}>Create Share Link</button>
    </div>
  );
}

export default RequestsScreen;
