import React, { useEffect} from 'react';
import {fetchAuthorizedPatientsData} from '../Backend/fetchPatientData';

function PatientListScreen({ providerProfile, onPatientSelect, patientProfiles, setPatientProfiles}) {

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientDataList = await fetchAuthorizedPatientsData(providerProfile["AuthorizedPatients"]);
        console.log(providerProfile);
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
