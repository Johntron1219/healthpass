// PatientProfileScreen.js
import React from 'react';

function PatientProfileScreen({ profile }) {
  return (
    <div className="patient-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <div className="profile-item">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="edit-date">Last updated: {profile.editDates.name}</p>
      </div>
      <div className="profile-item">
        <p>Address: {profile.address}</p>
        <p className="edit-date">Last updated: {profile.editDates.address}</p>
      </div>
      <div className="profile-item">
        <p>Email: {profile.email}</p>
        <p className="edit-date">Last updated: {profile.editDates.email}</p>
      </div>
      <section className="profile-section">
        <h2>Insurance Policy</h2>
        <p>Policy Number: {profile.insurancePolicyNumber}</p>
        <p className="edit-date">Last updated: {profile.editDates.insurancePolicy}</p>
        <p>Plan: {profile.insurancePlan}</p>
        <p className="edit-date">Last updated: {profile.editDates.insurancePolicy}</p>
      </section>
      <section className="profile-section">
        <h2>Medical Information</h2>
        {['healthConditions', 'allergies', 'medications', 'immunization', 'labRecords', 'medicalHistory', 'medicalConditions'].map((item) => (
          <div className="profile-item" key={item}>
            <p>{`${item.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + item.replace(/([A-Z])/g, ' $1').slice(1)}: ${profile[item]?.join(', ') || 'None'}`}</p>
            <p className="edit-date">Last updated: {profile.editDates[item]}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default PatientProfileScreen;
