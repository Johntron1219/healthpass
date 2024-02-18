import React from 'react';

function PatientDetailScreen({ selectedPatientProfile, onBackClick, onEditClick }) {
  const formatItemList = (items) => {
    return items.map((item, index) => (
      <div key={index} className="profile-item-detail">
        {Object.keys(item).map((key) => (
          <p key={key}><strong>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</strong> {item[key]}</p>
        ))}
      </div>
    )) || <p>None</p>;
  };

  return (
    <div className="patient-profile">
      <button className="Small-orange-button" onClick={onBackClick}>
        Back to Patient List
      </button>
      <h1 className="profile-name">{selectedPatientProfile.name}</h1>
      <p className="profile-dob">DOB: {selectedPatientProfile.DOB}</p>
      <p className="profile-email">Email: {selectedPatientProfile.email}</p>

      <h2>Conditions</h2>
      {formatItemList(selectedPatientProfile.metadata.conditions)}

      <h2>Allergies</h2>
      {formatItemList(selectedPatientProfile.metadata.allergies)}

      <h2>Medications</h2>
      {formatItemList(selectedPatientProfile.metadata.medications)}

      <h2>Procedures</h2>
      {formatItemList(selectedPatientProfile.metadata.procedures)}

      <h2>Immunizations</h2>
      {formatItemList(selectedPatientProfile.metadata.immunizations)}

      <h2>Lab Records</h2>
      {formatItemList(selectedPatientProfile.metadata.labrecords)}

      <button className="Small-orange-button" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
}
export default PatientDetailScreen;
