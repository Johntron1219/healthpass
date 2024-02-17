import React, { useState } from 'react';
import './App.css';
// Replace logo.svg with a placeholder image if you have one for profile pictures.
import placeholderImage from './placeholder-image.svg'; 

function App() {
  // Placeholder data - you would replace this with data from your backend
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main St, Anytown, AN 12345",
    photo: placeholderImage,
    email: "john.doe@example.com",
    medicalRecords: [],
    insurancePolicyNumber: "XYZ123456789",
    insurancePlan: "Basic Health Plan",
  });

  const [editHistory, setEditHistory] = useState([]);

  // Handler functions for approval actions
  const approveProviderAuthorization = () => {
    console.log("Provider authorization approved.");
    // Add logic to approve provider authorization
  };

  const approveMedicalRecordsAccess = () => {
    console.log("Medical records access approved.");
    // Add logic to approve pulling medical records
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={profile.photo} className="Profile-photo" alt="profile" />
        <h1>{profile.name}</h1>
        <p>{profile.address}</p>
        <p>{profile.email}</p>
        <section>
          <h2>Medical Records / Authorized Providers</h2>
          {/* Map through medical records and providers here */}
        </section>
        <section>
          <h2>Insurance Policy</h2>
          <p>Policy Number: {profile.insurancePolicyNumber}</p>
          <p>Plan: {profile.insurancePlan}</p>
        </section>
        <section>
          <h2>Edit History</h2>
          {/* Map through edit history here */}
        </section>
        <button onClick={approveProviderAuthorization}>Approve Provider Authorization</button>
        <button onClick={approveMedicalRecordsAccess}>Approve Medical Records Access</button>
      </header>
    </div>
  );
}

export default App;
