// ApprovalsScreen.js
import React from 'react';

function ApprovalsScreen({ providerAuthorizationRequests, pastMedicalRecordAccessApprovals, onApproveProvider, onApproveRecords, onCreateAccessLink }) {
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

  // Function to handle creation of medical record access link
  const handleCreateAccessLink = () => {
    console.log("Access link for medical records created.");
    if (onCreateAccessLink) onCreateAccessLink();
    // Further logic to create access link can be added here
  };

  return (
    <div className="approvals-screen">
      <h1>Approvals</h1>
      <div>
        <h2>Provider Authorization Requests</h2>
        {providerAuthorizationRequests.map((request) => (
          <div key={request.id}>
            {request.providerName} - {request.requestDate}
          </div>
        ))}
      </div>
      <button className="A-pink-button" onClick={handleProviderAuthorization}>Approve Provider Authorization</button>
      
      <div>
        <h2>Past Medical Record Access Approvals</h2>
        {pastMedicalRecordAccessApprovals.map((approval) => (
          <div key={approval.id}>
            {approval.patientName} - {approval.approvalDate}
          </div>
        ))}
      </div>
      <button className="A-pink-button" onClick={handleMedicalRecordsAccess}>Approve Medical Record Access</button>
      
      <button className="A-pink-button" onClick={handleCreateAccessLink}>Create Access Link</button>
    </div>
  );
}

export default ApprovalsScreen;
