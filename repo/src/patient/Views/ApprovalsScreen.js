// ApprovalsScreen.js
import React from 'react';


/*
call backend function that will retrieve 
list of providers associated with patient - this will feed into the react component fields
render the provider data onto the screen
if user clicks approve --> call backend approval function
if user denies --> call backend deny function
*/

const providerAuthorizationRequests = [
  { id: 1, providerName: "Dr. Smith", requestDate: "2024-02-15" },
  { id: 2, providerName: "Dr. Johnson", requestDate: "2024-02-14" }
];

const pastMedicalRecordAccessApprovals = [
  { id: 1, patientName: "John Doe", approvalDate: "2023-12-01" },
  { id: 2, patientName: "Jane Doe", approvalDate: "2023-11-25" }
];


// Functions to handle approvals and creating access links
const handleApproveProvider = () => {
  console.log("Approving provider...");
};

const handleApproveRecords = () => {
  console.log("Approving records access...");
};

const handleCreateAccessLink = () => {
  console.log("Creating access link...");
};

function ApprovalsScreen() {
  // Function to handle provider authorization approval
  const handleProviderAuthorization = () => {
    console.log("Provider authorization approved.");
    // if (onApproveProvider) handleApproveProvider(); // Invoke passed function to approve provider
  };

  // Function to handle medical records access approval
  const handleMedicalRecordsAccess = () => {
    console.log("Medical records access approved.");
    // if (onApproveRecords) handleApproveRecords(); // Invoke passed function to approve records access
  };

  // Function to handle creation of medical record access link
  const handleCreateAccessLink = () => {
    console.log("Access link for medical records created.");
    // if (onCreateAccessLink) handleCreateAccessLink(); // Invoke passed function to create access link
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
