// PatientProfileScreen.js
import React, { useState } from 'react';

function PatientProfileScreen({ profile }) {
  const [showSection, setShowSection] = useState({});

  const toggleSection = (section) => {
    setShowSection({ ...showSection, [section]: !showSection[section] });
  };

  return (
    <div className="patient-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <div className="profile-item">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="edit-date">Last updated: {profile.lastEditDate}</p>
      </div>
      <div className="profile-item">
        <p>Address: {profile.address}</p>
      </div>
      <div className="profile-item">
        <p>Email: {profile.email}</p>
      </div>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('insurance')}>Insurance</h2>
        {showSection['insurance'] && (
          <>
            <p>Policy Number: {profile.insurancePolicyNumber}</p>
            <p>Plan: {profile.insurancePlan}</p>
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('conditions')}>Conditions</h2>
        {showSection['conditions'] && (
          <>
            {profile.conditions.map((condition, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {condition.name}</p>
                <p>Provider: {condition.provider}</p>
                <p>Date: {condition.date}</p>
              </div>
            ))}
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('allergies')}>Allergies</h2>
        {showSection['allergies'] && (
          <>
            {profile.allergies.map((allergy, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {allergy.name}</p>
                <p>Severity: {allergy.severity}</p>
                <p>Provider: {allergy.provider}</p>
              </div>
            ))}
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('medications')}>Medications</h2>
        {showSection['medications'] && (
          <>
            {profile.medications.map((medication, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {medication.name}</p>
                <p>Dosage: {medication.dosage}</p>
                <p>Provider: {medication.provider}</p>
              </div>
            ))}
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('procedures')}>Procedures</h2>
        {showSection['procedures'] && (
          <>
            {profile.procedures.map((procedure, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {procedure.name}</p>
                <p>Date: {procedure.date}</p>
                <p>Provider: {procedure.provider}</p>
              </div>
            ))}
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('immunizations')}>Immunizations</h2>
        {showSection['immunizations'] && (
          <>
            {profile.immunizations.map((immunization, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {immunization.name}</p>
                <p>Date: {immunization.date}</p>
                <p>Provider: {immunization.provider}</p>
              </div>
            ))}
          </>
        )}
      </section>
      <section className="profile-section">
        <h2 onClick={() => toggleSection('labRecords')}>Lab Records</h2>
        {showSection['labRecords'] && (
          <>
            {profile.labRecords.map((labRecord, index) => (
              <div className="profile-item" key={index}>
                <p>Name: {labRecord.name}</p>
                <p>Value: {labRecord.value}</p>
                <p>Date: {labRecord.date}</p>
                <p>Provider: {labRecord.provider}</p>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}

export default PatientProfileScreen;
