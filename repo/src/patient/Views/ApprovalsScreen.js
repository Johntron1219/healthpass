// ApprovalsScreen.js
import React from 'react';

function ApprovalsScreen({ onApproveProvider, onApproveRecords }) {
  // Function to handle provider authorization approval
  const handleProviderAuthorization = () => {
    console.log("Provider authorization approved.");
    if (onApproveProvider) onApproveProvider();
    // Further logic to approve provider authorization can be added here
  };

  // Function to handle medical records access approval
  const handleMedicalRecordsAccess = () => {
    console.log("Medical records access approved.");
    if (onApproveRecords) onApproveRecords();
    // Further logic to approve pulling medical records can be added here
  };

  return (
    <div className="approvals-screen">
      <h1>Approvals</h1>
      <div className="approvals-buttons">
        <button className="A-pink-button" onClick={handleProviderAuthorization}>Approve Provider Authorization</button>
        <button className="A-pink-button" onClick={handleMedicalRecordsAccess}>Approve Medical Records Access</button>
      </div>
    </div>
  );
}

export default ApprovalsScreen;

