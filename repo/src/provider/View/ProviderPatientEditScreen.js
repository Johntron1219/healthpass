import React from 'react';

function ProviderPatientEditScreen({ selectedPatientProfile, switchScreen }) {
  if (!selectedPatientProfile) {
    return <div>No profile data available.</div>;
  }

  const handleEditClick = () => {
    console.log(`Edit ${selectedPatientProfile.name}`);
    switchScreen('home'); // For demo purposes, returning to home screen after editing
  };

  const formatItemList = (items) => {
    return items?.map((item, index) => (
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

  return (
    <div className="patient-profile">
      <h1 className="profile-name">{selectedPatientProfile.name}</h1>
      <p className="profile-dob">DOB: {selectedPatientProfile.dob}</p>
      <p className="profile-address">Address: {selectedPatientProfile.address}</p>
      <p className="profile-email">Email: {selectedPatientProfile.email}</p>
      <p className="profile-policy-number">Policy Number: {selectedPatientProfile.insurancePolicyNumber}</p>
      <p className="profile-insurance-plan">Plan: {selectedPatientProfile.insurancePlan}</p>
      
      <h2>Conditions</h2>
      {selectedPatientProfile.conditions && formatItemList(selectedPatientProfile.conditions)}
      
      <h2>Allergies</h2>
      {selectedPatientProfile.allergies && formatItemList(selectedPatientProfile.allergies)}
      
      <h2>Medications</h2>
      {selectedPatientProfile.medications && formatItemList(selectedPatientProfile.medications)}
      
      <h2>Procedures</h2>
      {selectedPatientProfile.procedures && formatItemList(selectedPatientProfile.procedures)}
      
      <h2>Immunizations</h2>
      {selectedPatientProfile.immunizations && formatItemList(selectedPatientProfile.immunizations)}
      
      <h2>Lab Records</h2>
      {selectedPatientProfile.labRecords && formatItemList(selectedPatientProfile.labRecords)}

      <button onClick={handleEditClick}>Edit Profile</button>
    </div>
  );
}

export default ProviderPatientEditScreen;
