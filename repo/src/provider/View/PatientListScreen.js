import React, { useEffect, useState } from 'react';
import fetchAuthorizedPatientsData from '../Backend/fetchPatientData'; // Corrected import path
import { getProviderData } from '../Backend/getProviderData';

// Example function to get authorized patients based on provider data
const getAuthorizedPatients = async (providerNPI) => {
  try {
      // Get provider data using the NPI
      const providerData = await getProviderData(providerNPI);
      
      // Check if provider data contains information about authorized patients
      if (providerData.authorizedPatients && Array.isArray(providerData.authorizedPatients)) {
          // Extract authorized patient IDs
          const authorizedPatientIDs = providerData.authorizedPatients;
          
          // Fetch authorized patient data using the IDs
          const authorizedPatients = await Promise.all(authorizedPatientIDs.map(async (patientID) => {
              try {
                  return await fetchAuthorizedPatientsData(patientID);
              } catch (error) {
                  console.error(`Error fetching authorized patient data for ID ${patientID}:`, error);
                  return null; // Handle error for individual patient fetch
              }
          }));
          
          return authorizedPatients.filter(patient => patient !== null); // Remove any null entries
      } else {
          console.log('No authorized patient data found in provider data');
          return []; // Return an empty array if no authorized patient data is found
      }
  } catch (error) {
      console.error('Error getting authorized patients:', error);
      return []; // Return an empty array in case of any error
  }
};

function PatientListScreen({ onPatientSelect }) {
  const [patientProfiles, setPatientProfiles] = useState([]);

  useEffect(() => {
    const authorizedPatientIDs = getAuthorizedPatients(NPI); // Replace this with the array of authorized patient IDs
    const fetchPatientData = async () => {
      try {
        const patientDataList = await fetchAuthorizedPatientsData(providerProfile["AuthorizedPatients"]);
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
