import React, { useEffect, useState } from 'react';
import getAllPatientData from '../../patient/Backend/getRecords/getPatientData';
import getProviderData from '../Backend/getProviderData'

/* 

get names of all the patients we have
store data of all patients in initial query call

if use clicks patient, load in patient data into that component
*/

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
