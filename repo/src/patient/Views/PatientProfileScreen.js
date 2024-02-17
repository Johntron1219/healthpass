// PatientProfileScreen.js
import React from 'react';

function PatientProfileScreen({ profile }) {
  return (
    <div className="patient-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <h1>{profile.name} (Last updated: {profile.editDates.name})</h1>
      <p>Address: {profile.address} (Last updated: {profile.editDates.address})</p>
      <p>Email: {profile.email} (Last updated: {profile.editDates.email})</p>
      <section>
        <h2>Insurance Policy</h2>
        <p>Policy Number: {profile.insurancePolicyNumber} (Last updated: {profile.editDates.insurancePolicy})</p>
        <p>Plan: {profile.insurancePlan} (Last updated: {profile.editDates.insurancePolicy})</p>
      </section>
      <section>
        <h2>Medical Information</h2>
        <p>Health Conditions: {profile.healthConditions?.join(', ') || 'None'} (Last updated: {profile.editDates.healthConditions})</p>
        <p>Allergies: {profile.allergies?.join(', ') || 'None'} (Last updated: {profile.editDates.allergies})</p>
        <p>Medications: {profile.medications?.join(', ') || 'None'} (Last updated: {profile.editDates.medications})</p>
        <p>Immunization: {profile.immunization?.join(', ') || 'None'} (Last updated: {profile.editDates.immunization})</p>
        <p>Lab Records: {profile.labRecords?.join(', ') || 'None'} (Last updated: {profile.editDates.labRecords})</p>
        <p>Medical History: {profile.medicalHistory?.join(', ') || 'None'} (Last updated: {profile.editDates.medicalHistory})</p>
        <p>Medical Conditions: {profile.medicalConditions?.join(', ') || 'None'} (Last updated: {profile.editDates.medicalConditions})</p>
      </section>
    </div>
  );
}

export default PatientProfileScreen;
