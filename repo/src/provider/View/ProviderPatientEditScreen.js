import React from 'react';

function ProviderPatientEditScreen({ patientProfiles, switchScreen }) {
  // Placeholder function for edit button click (to be implemented)
  const handleEditClick = (patientProfile) => {
    console.log(`Edit ${patientProfile.name}`);
    // Here, you would typically set the state to show an editable input or open a modal/dialog
    // For now, just switch to the edit screen for the selected patient profile
    switchScreen('edit');
  };

  return (
    <div className="patient-profiles">
      {patientProfiles.map((profile, index) => (
        <div className="patient-profile" key={index}>
          <div className="profile-item">
            <h1 className="profile-name">{profile.name}</h1>
            <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
            <p className="edit-date">Last updated: {profile.editDates.name}</p>
          </div>
          <div className="profile-item">
            <p>Address: {profile.address}</p>
            <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
            <p className="edit-date">Last updated: {profile.editDates.address}</p>
          </div>
          <div className="profile-item">
            <p>Email: {profile.email}</p>
            <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
            <p className="edit-date">Last updated: {profile.editDates.email}</p>
          </div>
          <section className="profile-section">
            <h2>Insurance Policy</h2>
            <p>Policy Number: {profile.insurancePolicyNumber}</p>
            <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
            <p>Plan: {profile.insurancePlan}</p>
            <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
          </section>
          <section className="profile-section">
            <h2>Medical Information</h2>
            {['healthConditions', 'allergies', 'medications', 'immunization', 'labRecords', 'medicalHistory', 'medicalConditions'].map((item) => (
              <div className="profile-item" key={item}>
                <p>{`${item.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + item.replace(/([A-Z])/g, ' $1').slice(1)}: ${profile[item]?.join(', ') || 'None'}`}</p>
                <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
                <p className="edit-date">Last updated: {profile.editDates[item]}</p>
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}

export default ProviderPatientEditScreen;
