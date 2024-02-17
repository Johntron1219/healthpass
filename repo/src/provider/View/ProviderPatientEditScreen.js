import React from 'react';

function ProviderPatientEditScreen({ patientProfile }) {
  // Placeholder function for edit button click (to be implemented)
  const handleEditClick = (field) => {
    console.log(`Edit ${field}`);
    // Here, you would typically set the state to show an editable input or open a modal/dialog
  };

  return (
    <div className="patient-profile">
      <img src={patientProfile.photo} className="Profile-photo" alt="profile" />
      <div className="profile-item">
        <h1 className="profile-name">{patientProfile.name}</h1>
        <button className="edit-button" onClick={() => handleEditClick('name')}>Edit</button>
        <p className="edit-date">Last updated: {patientProfile.editDates.name}</p>
      </div>
      <div className="profile-item">
        <p>Address: {patientProfile.address}</p>
        <button className="edit-button" onClick={() => handleEditClick('address')}>Edit</button>
        <p className="edit-date">Last updated: {patientProfile.editDates.address}</p>
      </div>
      <div className="profile-item">
        <p>Email: {patientProfile.email}</p>
        <button className="edit-button" onClick={() => handleEditClick('email')}>Edit</button>
        <p className="edit-date">Last updated: {patientProfile.editDates.email}</p>
      </div>
      <section className="profile-section">
        <h2>Insurance Policy</h2>
        <p>Policy Number: {patientProfile.insurancePolicyNumber}</p>
        <button className="edit-button" onClick={() => handleEditClick('insurancePolicyNumber')}>Edit</button>
        <p>Plan: {patientProfile.insurancePlan}</p>
        <button className="edit-button" onClick={() => handleEditClick('insurancePlan')}>Edit</button>
      </section>
      <section className="profile-section">
        <h2>Medical Information</h2>
        {['healthConditions', 'allergies', 'medications', 'immunization', 'labRecords', 'medicalHistory', 'medicalConditions'].map((item) => (
          <div className="profile-item" key={item}>
            <p>{`${item.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + item.replace(/([A-Z])/g, ' $1').slice(1)}: ${patientProfile[item]?.join(', ') || 'None'}`}</p>
            <button className="edit-button" onClick={() => handleEditClick(item)}>Edit</button>
            <p className="edit-date">Last updated: {patientProfile.editDates[item]}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProviderPatientEditScreen;
