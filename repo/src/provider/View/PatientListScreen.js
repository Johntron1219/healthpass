import React from 'react';

function PatientListScreen({ patientProfiles, onPatientSelect }) {
  return (
    <div>
      <h2>Select a patient to edit:</h2>
      <div className="patient-list">
        {Array.isArray(patientProfiles) && patientProfiles.map((profile, index) => (
          <button
            className="Small-orange-button"
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
