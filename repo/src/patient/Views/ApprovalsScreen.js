// ApprovalsScreen.js
import React from 'react';

function ApprovalsScreen({ providerAuthorizationRequests, pastMedicalRecordAccessApprovals, onApproveProvider, onApproveRecords, onCreateAccessLink }) {
  // Function to handle provider authorization approval
  const handleProviderAuthorization = () => {
    console.log("Provider authorization approved.");
    if (onApproveProvider) onApproveProvider(); // Invoke passed function to approve provider
  };

  // Function to handle medical records access approval
  const handleMedicalRecordsAccess = () => {
    console.log("Medical records access approved.");
    if (onApproveRecords) onApproveRecords(); // Invoke passed function to approve records access
  };

  // Function to handle creation of medical record access link
  const handleCreateAccessLink = () => {
    console.log("Access link for medical records created.");
    if (onCreateAccessLink) onCreateAccessLink(); // Invoke passed function to create access link
  };

  return (
    <div className="approvals-screen">
      <h1>Approvals</h1>
      <div className="approval-item">
        <h2>Provider Authorization Requests</h2>
        {providerAuthorizationRequests.map((request) => (
          <div key={request.id} className="request-item">
            {request.providerName} - {request.requestDate}
          </div>
        ))}
      </div>
      <button className="A-pink-button" onClick={handleProviderAuthorization}>Approve Provider Authorization</button>
      
      <div className="approval-item">
        <h2>Past Medical Record Access Approvals</h2>
        {pastMedicalRecordAccessApprovals.map((approval) => (
          <div key={approval.id} className="approval-history-item">
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
