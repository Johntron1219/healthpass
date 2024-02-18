import React, { useState, useEffect } from 'react';
import placeholderImage from '../../public/Elf.webp';
import PatientHomeScreen from './PatientHomeScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ApprovalsScreen from './ApprovalsScreen';
import { getAllPatientData } from '../Backend/getRecords/getPatientData'; // Correct import
function PatientScreen({ setCurrentScreen, patientID}) {
  const [patientScreen, setPatientScreen] = useState('home');
  const [profile, setProfile] = useState(null);
  const pt = patientID;
  useEffect(() => {
    async function fetchData() {
      const patientData = await getAllPatientData(patientID);
      
      setProfile({
        PID: patientData.PID,
        name: patientData.name,
        email: patientData.email,
        password: patientData.password,
        DOB: patientData.DOB,
        authorizedNPIs: patientData.authorizedNPIs,
        incomingRequests: patientData.incomingRequests,
        metadata: patientData.metadata,
        photo: placeholderImage,
      });
    }

    fetchData();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  let screen;
  console.log(profile)
  switch (patientScreen) {
    case 'home':
      screen = <PatientHomeScreen profile={profile} />;
      break;
    case 'profile':
      screen = <PatientProfileScreen profile={profile} />;
      break;
    case 'approvals':
      screen = <ApprovalsScreen patientID={pt}/>;
      break;
    default:
      screen = <PatientHomeScreen profile={profile} />;
      break;
  }

  return (
    <div className="patient-screen">
      {screen}
      <div className="patient-screen-footer">
        <button className="Small-blue-button" onClick={() => setPatientScreen('home')}>Home</button>
        <button className="Small-blue-button" onClick={() => setPatientScreen('profile')}>Profile</button>
        <button className="Small-blue-button" onClick={() => setPatientScreen('approvals')}>Approvals</button>
      </div>
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Logout</button>
    </div>
  );
}

export default PatientScreen;
