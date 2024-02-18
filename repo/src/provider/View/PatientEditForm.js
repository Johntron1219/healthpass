import React, { useState } from 'react';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // If the input is part of a sub-array, handle that case differently
    if(event.target.getAttribute('data-subarray')) {
      const subarray = event.target.getAttribute('data-subarray');
      const index = event.target.getAttribute('data-index');
      const updatedSubarray = [...patientData[subarray]];
      updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
      setPatientData({ ...patientData, [subarray]: updatedSubarray });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patientData);
  };

  // Render input fields for sub-arrays like conditions, allergies, etc.
  const renderSubArrayFields = (subArrayName) => {
    return patientData[subArrayName].map((item, index) => (
      <div key={index}>
        <label>{subArrayName.slice(0, -1)} Name:</label>
        <input
          type="text"
          name="name"
          data-subarray={subArrayName}
          data-index={index}
          value={item.name}
          onChange={handleInputChange}
        />
        {/* Add more fields for each attribute in the subarray if needed */}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        value={patientData.name}
        onChange={handleInputChange}
      />

      <label htmlFor="dob">Date of Birth:</label>
      <input
        id="dob"
        type="date"
        name="dob"
        value={patientData.dob}
        onChange={handleInputChange}
      />

      <label htmlFor="address">Address:</label>
      <input
        id="address"
        type="text"
        name="address"
        value={patientData.address}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        value={patientData.email}
        onChange={handleInputChange}
      />

      <label htmlFor="insurancePolicyNumber">Insurance Policy Number:</label>
      <input
        id="insurancePolicyNumber"
        type="text"
        name="insurancePolicyNumber"
        value={patientData.insurancePolicyNumber}
        onChange={handleInputChange}
      />

      <label htmlFor="insurancePlan">Insurance Plan:</label>
      <input
        id="insurancePlan"
        type="text"
        name="insurancePlan"
        value={patientData.insurancePlan}
        onChange={handleInputChange}
      />

      {/* Sub-array fields for Conditions, Allergies, Medications, etc. */}
      <fieldset>
        <legend>Conditions</legend>
        {renderSubArrayFields('conditions')}
      </fieldset>

      <fieldset>
        <legend>Allergies</legend>
        {renderSubArrayFields('allergies')}
      </fieldset>

      <fieldset>
        <legend>Medications</legend>
        {renderSubArrayFields('medications')}
      </fieldset>

      <fieldset>
        <legend>Procedures</legend>
        {renderSubArrayFields('procedures')}
      </fieldset>

      <fieldset>
        <legend>Immunizations</legend>
        {renderSubArrayFields('immunizations')}
      </fieldset>

      <fieldset>
        <legend>Lab Records</legend>
        {renderSubArrayFields('labRecords')}
      </fieldset>

      <button type="submit" className="save-button">Save</button>
      <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
