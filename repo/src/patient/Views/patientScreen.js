import React, { useState, useEffect } from 'react';
import placeholderImage from '../../public/Elf.webp';
import PatientHomeScreen from './PatientHomeScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ApprovalsScreen from './ApprovalsScreen';
import getPatientData from '../Backend/getPatientData'; // Correct import

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
        conditions: [
          {
            name: "Hypertension",
            provider: "Dr. Smith",
            date: "2023-01-15"
          }
        ],
        allergies: [
          {
            name: "Pollen",
            severity: "Mild",
            provider: "Dr. Johnson"
          }
        ],
        medications: [
          {
            name: "Lisinopril",
            dosage: "10 mg",
            provider: "Dr. Smith"
          }
        ],
        procedures: [
          {
            name: "Appendectomy",
            date: "2015-05-20",
            provider: "Dr. Brown"
          }
        ],
        immunizations: [
          {
            name: "Influenza",
            date: "2022-10-01",
            provider: "Dr. Lee"
          }
        ],
        labRecords: [
          {
            name: "CBC",
            value: "Normal",
            date: "2024-01-10",
            provider: "LabCorp"
          },
          {
            name: "Cholesterol",
            value: "Slightly High",
            date: "2023-12-15",
            provider: "Quest Diagnostics"
          }
        ]
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
      screen = <ApprovalsScreen/>;
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
