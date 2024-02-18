import React, { useState, useEffect } from 'react';
import placeholderImage from '../../public/Elf.webp';
import PatientHomeScreen from './PatientHomeScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ApprovalsScreen from './ApprovalsScreen';
import getPatientData from '../Backend/getPatientData'; // Correct import
import getConditions from '../Backend/getConditions';
import getAllergies from '../Backend/getAllergies';
import getMedications from '../Backend/getMedications';
import getProcedures from '../Backend/getProcedures';
import getImmunizations from '../Backend/getImmunizations';
import getLabRecords from '../Backend/getLabRecords';
function PatientScreen({ setCurrentScreen }) {
  const [patientScreen, setPatientScreen] = useState('home');
  const [profile, setProfile] = useState(null);
  const pt = "0002";
  useEffect(() => {
    async function fetchData() {
      setProfile({
        name: await getPatientData(pt, "metadata.firstname")+" "+await getPatientData(pt, "metadata.middlename")+" "+await getPatientData(pt, "metadata.lastname"),
        lastEditDate: "2024-02-17",
        address: await getPatientData(pt, "metadata.address")+", "+await getPatientData(pt, "metadata.city")+", "+await getPatientData(pt, "metadata.state") +" "+await getPatientData(pt, "metadata.zip"),
        photo: placeholderImage,
        dob:await getPatientData(pt, "metadata.monthofbirth")+"/"+await getPatientData(pt, "metadata.dayofbirth")+"/"+await getPatientData(pt, "metadata.yearofbirth"),
        email: await getPatientData(pt, "email"),
        insurancePolicyNumber: await getPatientData(pt, "metadata.insurancename"),
        insurancePlan: await getPatientData(pt, "metadata.insurancenum"),
        conditions: await getConditions(pt),
        allergies: await getAllergies(pt),
        medications: await getMedications(pt),
        procedures: await getProcedures(pt),
        immunizations: await getImmunizations(pt),
        labRecords: await getLabRecords(pt)
      });
    }

    fetchData();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }


  let screen;
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
