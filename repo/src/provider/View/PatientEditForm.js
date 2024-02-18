import React, { useState } from 'react';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = (event, subarrayName, index) => {
    const { name, value } = event.target;
    const updatedSubarray = [...patientData[subarrayName]];
    updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
    setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
  };

  const handleAddNewItem = (subarrayName) => {
    const newItem = { name: '', provider: '', date: '' }; // Default structure for most items
    if (subarrayName === 'labRecords') {
      newItem.value = ''; // Additional field for lab records
    }
    const updatedSubarray = [...(patientData[subarrayName] || []), newItem];
    setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
  };

  const handleDeleteItem = (subarrayName, index) => {
    const updatedSubarray = [...patientData[subarrayName]];
    updatedSubarray.splice(index, 1);
    setPatientData({ ...patientData, [subarrayName]: updatedSubarray });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(patientData);
  };

  const renderSubArrayFields = (subArrayName) => {
    return (patientData[subArrayName] || []).map((item, index) => (
      <div key={index} className="subarray-fields">
        {/* Input fields for item details */}
        <div>
          <label>{`${subArrayName.slice(0, -1)} Name:`}</label>
          <input type="text" name="name" value={item.name} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        <div>
          <label>Provider:</label>
          <input type="text" name="provider" value={item.provider} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={item.date} onChange={(e) => handleInputChange(e, subArrayName, index)} />
        </div>
        {/* Optional fields based on subarray type */}
        {/* Delete button for each item */}
        <button type="button" onClick={() => handleDeleteItem(subArrayName, index)}>Delete</button>
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Dynamic rendering of sub-array fields and their respective add/delete buttons */}
      {['conditions', 'allergies', 'medications', 'procedures', 'immunizations', 'labRecords'].map((subArrayName) => (
        <fieldset key={subArrayName}>
          <legend>{subArrayName.charAt(0).toUpperCase() + subArrayName.slice(1)}</legend>
          {renderSubArrayFields(subArrayName)}
          <button type="button" onClick={() => handleAddNewItem(subArrayName)}>Add New {subArrayName.slice(0, -1)}</button>
        </fieldset>
      ))}
      <button className="Smaller-orange-button" type="submit">Save Changes</button>
      <button className="Smaller-orange-button" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
