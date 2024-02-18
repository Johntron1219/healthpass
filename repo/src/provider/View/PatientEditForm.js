import React, { useState } from 'react';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = (event, subarrayName, index) => {
    const { name, value } = event.target;

    if (subarrayName) {
      // Update subarray fields
      const updatedSubarray = [...patientData[subarrayName]];
      updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
      setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
    } else {
      // Update regular fields
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patientData);
  };

  // Renders fields for subarray items
  const renderSubArrayFields = (subArrayName) => {
    return patientData[subArrayName].map((item, index) => (
      <div key={index} className={`subarray-fields ${subArrayName}`}>
        <label>{`${subArrayName.slice(0, -1)} Name:`}</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={(e) => handleInputChange(e, subArrayName, index)}
        />

        {/* Additional fields for subarray items, like provider, date, etc. */}
        <label>Provider:</label>
        <input
          type="text"
          name="provider"
          value={item.provider}
          onChange={(e) => handleInputChange(e, subArrayName, index)}
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={item.date}
          onChange={(e) => handleInputChange(e, subArrayName, index)}
        />

        {item.dosage !== undefined && (
          <>
            <label>Dosage:</label>
            <input
              type="text"
              name="dosage"
              value={item.dosage}
              onChange={(e) => handleInputChange(e, subArrayName, index)}
            />
          </>
        )}

        {item.severity !== undefined && (
          <>
            <label>Severity:</label>
            <input
              type="text"
              name="severity"
              value={item.severity}
              onChange={(e) => handleInputChange(e, subArrayName, index)}
            />
          </>
        )}

        {item.value !== undefined && (
          <>
            <label>Value:</label>
            <input
              type="text"
              name="value"
              value={item.value}
              onChange={(e) => handleInputChange(e, subArrayName, index)}
            />
          </>
        )}

        {/* Button to delete a subarray item (optional) */}
        {/* <button type="button" onClick={() => handleDeleteSubArrayItem(subArrayName, index)}>Delete</button> */}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... existing code for the main patient attributes ... */}

      {/* Render sub-array fields like conditions, allergies, etc. */}
      <fieldset>
        <legend>Conditions</legend>
        {renderSubArrayFields('conditions')}
      </fieldset>

      {/* ... repeat for other subarrays ... */}
      <fieldset>
        <legend>Allergies</legend>
        {renderSubArrayFields('allergies')}
      </fieldset>

      <fieldset>
        <legend>Medications</legend>
        {renderSubArrayFields('medications')}
      </fieldset>

      {/* ... repeat for other subarrays ... */}
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

      <button className="Small-orange-button" type="submit">Save Changes</button>
      <button className="Small-orange-button" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
