import React, { useState } from 'react';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = (event, subarrayName, index) => {
    const { name, value } = event.target;
    if (subarrayName) {
      const updatedSubarray = [...patientData[subarrayName]];
      updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
      setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
    } else {
      setPatientData({ ...patientData, [name]: value });
    }
  };

  const handleAddNewItem = (subarrayName) => {
    const newItem = subarrayName === 'labRecords' ? { name: '', value: '', date: '' } : { name: '', provider: '', date: '' };
    if (subarrayName === 'medications' || subarrayName === 'allergies') {
      newItem['dosage'] = '';
      newItem['severity'] = '';
    }
    const updatedSubarray = [...(patientData[subarrayName] || []), newItem];
    setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patientData);
  };

  const renderSubArrayFields = (subArrayName) => {
    return (patientData[subArrayName] || []).map((item, index) => (
      <div key={index} className="subarray-fields">
        <div>
          <label>{`${subArrayName.slice(0, -1)} Name:`}</label>
          <input type="text" name="name" value={item.name} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        {/* Additional fields and buttons for specific subarrays */}
        {/* Common fields for conditions, procedures, etc. */}
        <div>
          <label>Provider:</label>
          <input type="text" name="provider" value={item.provider} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={item.date} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        {/* Example of conditionally rendering fields for medications and allergies */}
        {['medications', 'allergies'].includes(subArrayName) && (
          <>
            <div>
              <label>Dosage/Severity:</label>
              <input type="text" name="dosage" value={item.dosage || item.severity} onChange={(e) => handleInputChange(e, subArrayName, index)} />
            </div>
          </>
        )}
        {/* Add more conditional fields as needed */}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render existing sub-array fields and add buttons for new items */}
      {['conditions', 'allergies', 'medications', 'procedures', 'immunizations', 'labRecords'].map((subArrayName) => (
        <fieldset key={subArrayName}>
          <legend>{subArrayName.charAt(0).toUpperCase() + subArrayName.slice(1)}</legend>
          {renderSubArrayFields(subArrayName)}
          <button type="button" onClick={() => handleAddNewItem(subArrayName)}>Add New {subArrayName.slice(0, -1)}</button>
        </fieldset>
      ))}
      <button className="Small-orange-button" type="submit">Save Changes</button>
      <button className="Small-orange-button" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
