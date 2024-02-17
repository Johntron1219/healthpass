// PatientProfileScreen.js
import React from 'react';

function PatientProfileScreen({ profile }) {
  return (
    <div className="patient-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <h1>{profile.name}</h1>
      <p>{profile.address}</p>
      <p>{profile.email}</p>
      <section>
        <h2>Insurance Policy</h2>
        <p>Policy Number: {profile.insurancePolicyNumber}</p>
        <p>Plan: {profile.insurancePlan}</p>
      </section>
      <section>
        <h2>Medical Information</h2>
        <p>Health Conditions: {profile.healthConditions?.join(', ') || 'None'}</p>
        <p>Allergies: {profile.allergies?.join(', ') || 'None'}</p>
        <p>Medications: {profile.medications?.join(', ') || 'None'}</p>
        <p>Immunization: {profile.immunization?.join(', ') || 'None'}</p>
        <p>Lab Records: {profile.labRecords?.join(', ') || 'None'}</p>
        <p>Medical History: {profile.medicalHistory?.join(', ') || 'None'}</p>
        <p>Medical Conditions: {profile.medicalConditions?.join(', ') || 'None'}</p>
      </section>
      <section>
        <h2>Edit History</h2>
        {/* Edit history can be mapped and displayed here */}
      </section>
    </div>
  );
}

export default PatientProfileScreen;

