import React, { useState, useEffect } from 'react';
import placeholderImage from '../../public/Elf.webp';
import PatientHomeScreen from './PatientHomeScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ApprovalsScreen from './ApprovalsScreen';
import fetchPtData from '../Backend/fetchptdata'; // Correct import

function PatientScreen({ setCurrentScreen }) {
  const [patientScreen, setPatientScreen] = useState('home');
  const [profile, setProfile] = useState(null);
  const pt = "0002";
  useEffect(() => {
    async function fetchData() {
      setProfile({
        name: await fetchPtData(pt, "metadata.firstname")+" "+await fetchPtData(pt, "metadata.middlename")+" "+await fetchPtData(pt, "metadata.lastname"),
        lastEditDate: "2024-02-17",
        address: await fetchPtData(pt, "metadata.address")+", "+await fetchPtData(pt, "metadata.city")+", "+await fetchPtData(pt, "metadata.state") +" "+await fetchPtData(pt, "metadata.zip"),
        photo: placeholderImage,
        dob:await fetchPtData(pt, "metadata.monthofbirth")+"/"+await fetchPtData(pt, "metadata.dayofbirth")+"/"+await fetchPtData(pt, "metadata.yearofbirth"),
        email: await fetchPtData(pt, "email"),
        insurancePolicyNumber: await fetchPtData(pt, "metadata.insurancename"),
        insurancePlan: await fetchPtData(pt, "metadata.insurancenum"),
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

  const providerAuthorizationRequests = [
    { id: 1, providerName: "Dr. Smith", requestDate: "2024-02-15" },
    { id: 2, providerName: "Dr. Johnson", requestDate: "2024-02-14" }
  ];

  const pastMedicalRecordAccessApprovals = [
    { id: 1, patientName: "John Doe", approvalDate: "2023-12-01" },
    { id: 2, patientName: "Jane Doe", approvalDate: "2023-11-25" }
  ];


  // Functions to handle approvals and creating access links
  const handleApproveProvider = () => {
    console.log("Approving provider...");
  };

  const handleApproveRecords = () => {
    console.log("Approving records access...");
  };

  const handleCreateAccessLink = () => {
    console.log("Creating access link...");
  };

  let screen;
  switch (patientScreen) {
    case 'home':
      screen = <PatientHomeScreen profile={profile} />;
      break;
    case 'profile':
      screen = <PatientProfileScreen profile={profile} />;
      break;
    case 'approvals':
      screen = <ApprovalsScreen 
                providerAuthorizationRequests={providerAuthorizationRequests} 
                pastMedicalRecordAccessApprovals={pastMedicalRecordAccessApprovals}
                onApproveProvider={handleApproveProvider} 
                onApproveRecords={handleApproveRecords} 
                onCreateAccessLink={handleCreateAccessLink}
                />;
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
      <button className="Home-button" onClick={() => setCurrentScreen('home')}>Back to Main Home</button>
    </div>
  );
}

export default PatientScreen;
