import React from 'react';
import ProviderEditScreen from './ProviderEditScreen';

function ProviderPatientEditScreen({ patientProfiles = [], switchScreen }) {
  // Placeholder function for edit button click
  const handleEditClick = (profile) => {
    console.log(`Edit ${profile.name}`);
    // Switch to the edit screen for the selected patient profile
    switchScreen(<ProviderEditScreen profile={profile} />);
  };

  return (
    <div className="patient-profiles">
      {patientProfiles.map((profile, index) => (
        <div className="patient-profile" key={index}>
          {/* Patient profile details */}
          <div className="profile-item">
            <div className="profile-column">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-data">Address: {profile.address}</p>
              <p className="profile-data">Email: {profile.email}</p>
              <p className="profile-data">Policy Number: {profile.insurancePolicyNumber}</p>
              <p className="profile-data">Plan: {profile.insurancePlan}</p>
            </div>
            <div className="profile-column">
              <p className="edit-date">Last updated: {profile.editDates.name}</p>
              {/* Edit button */}
              <button className="edit-button" onClick={() => handleEditClick(profile)}>Edit</button>
            </div>
          </div>
          <section className="profile-section">
            <h3>Medical Information</h3>
            {['healthConditions', 'allergies', 'medications', 'immunization', 'labRecords', 'medicalHistory', 'medicalConditions'].map((item) => (
              <div className="profile-item" key={item}>
                <p>{`${item.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + item.replace(/([A-Z])/g, ' $1').slice(1)}: ${profile[item]?.join(', ') || 'None'}`}</p>
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

//TODO: data adjustment, working for editting patient data, login system, sending system
