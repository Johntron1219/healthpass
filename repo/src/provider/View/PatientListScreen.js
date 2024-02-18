import React, { useEffect, useState } from 'react';
import fetchAuthorizedPatientsData from '../../Backend/fetchPatientData'; // Corrected import path

function PatientListScreen({ onPatientSelect }) {
  const [patientProfiles, setPatientProfiles] = useState([]);

  useEffect(() => {
    const authorizedPatientIDs = []; // Replace this with the array of authorized patient IDs
    const fetchPatientData = async () => {
      try {
        const patientDataList = await fetchAuthorizedPatientsData(authorizedPatientIDs);
        setPatientProfiles(patientDataList);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();

    // Cleanup function
    return () => {
      // Perform any cleanup if necessary
    };
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

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
