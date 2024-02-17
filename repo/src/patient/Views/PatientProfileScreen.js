// PatientProfileScreen.js
import React, { useState } from 'react';

// Assuming a simple CSS import for styling
import './PatientProfileScreen.css'; // Ensure this path matches your CSS file's location

function PatientProfileScreen({ profile }) {
  const [showSection, setShowSection] = useState({
    conditions: false,
    allergies: false,
    medications: false,
    procedures: false,
    immunizations: false,
    labRecords: false,
  });

  const toggleSection = (section) => {
    setShowSection(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  // Function to format section names for display
  const formatSectionName = (section) => {
    if (section === 'labRecords') return 'Lab Records';
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="patient-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <div className="profile-item">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="edit-date">Last updated: {profile.lastEditDate}</p>
      </div>
      <div className="profile-item">
        <p>Address: {profile.address}</p>
      </div>
      <div className="profile-item">
        <p>Email: {profile.email}</p>
      </div>
      {/* Displaying insurance information at all times */}
      <div className="profile-item">
        <h2>Insurance</h2>
        <p>Policy Number: {profile.insurancePolicyNumber}</p>
        <p>Plan: {profile.insurancePlan}</p>
      </div>
      {['conditions', 'allergies', 'medications', 'procedures', 'immunizations', 'labRecords'].map(section => (
        <section key={section} className="profile-section">
          <h2 onClick={() => toggleSection(section)}>{formatSectionName(section)}</h2>
          {showSection[section] && profile[section] && (
            <div>
              {profile[section].map((item, index) => (
                <div className="profile-item" key={index}>
                  {Object.keys(item).map((key) => (
                    <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default PatientProfileScreen;
