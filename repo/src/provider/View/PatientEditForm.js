import React, { useState } from 'react';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const subarray = event.target.getAttribute('data-subarray');
    const index = event.target.getAttribute('data-index');

    // Update subarray fields
    if (subarray) {
      const updatedSubarray = [...patientData[subarray]];
      updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
      setPatientData({ ...patientData, [subarray]: updatedSubarray });
    } else {
      // Update regular fields
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patientData);
  };

  // Define renderSubArrayFields function here
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
        {/* Additional fields for subarray items can be added here */}
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

      {/* Repeat for other attributes */}
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

      {/* ... Repeat for other attributes ... */}

      {/* Render sub-array fields like conditions, allergies, etc. */}
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

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
