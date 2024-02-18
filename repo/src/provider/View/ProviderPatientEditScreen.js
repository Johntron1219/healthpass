import React from 'react';
import './ProviderPatientEditScreen.css'; // Make sure this path is correct

function ProviderPatientEditScreen({ patientProfiles, selectedPatientProfile, switchScreen }) {
  
  const formatItemList = (items) => {
    return items.map((item, index) => (
      <div key={index} className="profile-item-detail">
        <p>{item.name}</p>
        <p>Provider: {item.provider}</p>
        <p>Date: {item.date}</p>
        {item.severity && <p>Severity: {item.severity}</p>}
        {item.dosage && <p>Dosage: {item.dosage}</p>}
        {item.value && <p>Value: {item.value}</p>}
      </div>
    )) || <p>None</p>;
  };

  const handleEditClick = () => {
    console.log(`Editing ${selectedPatientProfile.name}`);
    // The actual editing logic would go here
  };

  const handleBackClick = () => {
    // This will clear the selected patient profile and go back to the list
    switchScreen('edit');
  };

  if (!selectedPatientProfile) {
    return (
      <div>
        <h2>Select a patient to edit:</h2>
        <div className="patient-list">
          {patientProfiles.map((profile, index) => (
            <button className="Small-orange-button" 
              key={index}
              onClick={() => switchScreen('edit', profile)}
            >
              {profile.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="patient-profile">
      <button className="Small-orange-button" 
        onClick={handleBackClick}
      >
        Back to Patient List
      </button>
      <h1 className="profile-name">{selectedPatientProfile.name}</h1>
      <p className="profile-dob">DOB: {selectedPatientProfile.dob}</p>
      <p className="profile-address">Address: {selectedPatientProfile.address}</p>
      <p className="profile-email">Email: {selectedPatientProfile.email}</p>
      <p className="profile-policy-number">Policy Number: {selectedPatientProfile.insurancePolicyNumber}</p>
      <p className="profile-insurance-plan">Plan: {selectedPatientProfile.insurancePlan}</p>

      <h2>Conditions</h2>
      {formatItemList(selectedPatientProfile.conditions)}

      <h2>Allergies</h2>
      {formatItemList(selectedPatientProfile.allergies)}

      <h2>Medications</h2>
      {formatItemList(selectedPatientProfile.medications)}

      <h2>Procedures</h2>
      {formatItemList(selectedPatientProfile.procedures)}

      <h2>Immunizations</h2>
      {formatItemList(selectedPatientProfile.immunizations)}

      <h2>Lab Records</h2>
      {formatItemList(selectedPatientProfile.labRecords)}

      <button className="Small-orange-button" 
        onClick={handleEditClick}
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ProviderPatientEditScreen;
