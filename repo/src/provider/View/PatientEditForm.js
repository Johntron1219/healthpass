import React, { useState } from 'react';
import { updatePatientField } from '../../patient/Backend/updatePatientField';
import { addPatientField } from '../../patient/Backend/addPatientField';
import { deletePatientField } from '../../patient/Backend/deletePatientField';

function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const handleInputChange = async (event, subarrayName, index) => {
    const { name, value } = event.target;
    const updatedSubarray = [...patientData.metadata[subarrayName]];
    updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
    setPatientData({ ...patientData, metadata: { ...patientData.metadata, [subarrayName]: updatedSubarray } });
    updatePatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleAddNewItem = (subarrayName) => {
    const newItem = { NPI: '' }; // Initialize with an empty NPI field
    const updatedSubarray = [...patientData.metadata[subarrayName], newItem];
    setPatientData({ ...patientData, metadata: { ...patientData.metadata, [subarrayName]: updatedSubarray } });
    addPatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleDeleteItem = (subarrayName, index) => {
    const updatedSubarray = [...patientData.metadata[subarrayName]];
    updatedSubarray.splice(index, 1);
    setPatientData({ ...patientData, metadata: { ...patientData.metadata, [subarrayName]: updatedSubarray } });
    deletePatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    onSave(patientData); // This will call the `handleSavePatient` function passed as a prop
  };

  const renderSubArrayFields = (subArrayName) => {
    return (patientData.metadata[subArrayName] || []).map((item, index) => (
      <div key={index} className="subarray-fields">
        {/* Input fields for item details */}
        {Object.keys(item).map((key) => (
          <div key={key}>
            <label>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</label>
            <input type="text" name={key} value={item[key]} onChange={(e) => handleInputChange(e, subArrayName, index)} />
          </div>
        ))}
        {/* Delete button for each item */}
        <button className="Smaller-blue-button" type="button" onClick={() => handleDeleteItem(subArrayName, index)}>Delete</button>
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Dynamic rendering of sub-array fields and their respective add/delete buttons */}
      {['pastNPIs', 'medications', 'allergies', 'conditions', 'procedures', 'immunizations', 'labrecords'].map((subArrayName) => (
        <fieldset key={subArrayName}>
          <legend>{subArrayName.charAt(0).toUpperCase() + subArrayName.slice(1)}</legend>
          {renderSubArrayFields(subArrayName)}
          <button className="Smaller-blue-button" type="button" onClick={() => handleAddNewItem(subArrayName)}>Add New {subArrayName.slice(0, -1)}</button>
        </fieldset>
      ))}
      <button className="Smaller-orange-button" type="submit">Save Changes</button>
      <button className="Smaller-orange-button" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default PatientEditForm;
