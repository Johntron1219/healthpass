import React from 'react';

function PatientDetailScreen({ selectedPatientProfile, onBackClick, onEditClick }) {
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

  return (
    <div className="patient-profile">
      <button onClick={onBackClick}>
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

      <button onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
}

export default PatientDetailScreen;
