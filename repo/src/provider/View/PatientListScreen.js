import React from 'react';

function PatientListScreen({ patientProfiles, onPatientSelect }) {
  return (
    <div>
      <h2>Select a patient to edit:</h2>
      <div className="patient-list">
        {patientProfiles.map((profile, index) => (
          <button
            className="patient-select-button"
            key={index}
            onClick={() => onPatientSelect(profile)}
          >
            {profile.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientListScreen;