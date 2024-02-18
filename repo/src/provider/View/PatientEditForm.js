import React, { useState } from 'react';
import { updatePatientField } from '../../patient/Backend/updatePatientField';
import { addPatientField } from '../../patient/Backend/addPatientField';
import { deletePatientField } from '../../patient/Backend/deletePatientField';


/*
- handle local unsaved version copy of patient data
- handle app wide version of patient data (retrieved from last api call)
- call updatePatientField after save edits are made (calls with pid and patientProfile)

- add item
- delete item
- edit specific field within the item

- inputs - broadPatientData (selectedPatientProfile), setPatientProfile, s
*/
function PatientEditForm({ selectedPatientProfile, onSave, onCancel }) {
  const [patientData, setPatientData] = useState({ ...selectedPatientProfile });

  const [unsavedPatientData, setUnsavedPatientData] = useState(selectedPatientProfile)

  const handleInputChange = async (event, subarrayName, index) => {
    
    const { name, value } = event.target;
    const updatedSubarray = [...unsavedPatientData.metadata[subarrayName]];
    updatedSubarray[index] = { ...updatedSubarray[index], [name]: value };
    setUnsavedPatientData({ ...unsavedPatientData, metadata: { ...unsavedPatientData.metadata, [subarrayName]: updatedSubarray } });
    console.log(unsavedPatientData)
    // updatePatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleAddNewItem = (subarrayName) => {
    const newItem = {};
    Object.keys(patientData.metadata[subarrayName][0]).forEach(key => {
      newItem[key] = '';
    });
    const updatedSubarray = [...unsavedPatientData.metadata[subarrayName]];
    updatedSubarray.push(newItem);
    setUnsavedPatientData({ ...unsavedPatientData, metadata: { ...unsavedPatientData.metadata, [subarrayName]: updatedSubarray } });
    // addPatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleDeleteItem = (subarrayName, index) => {
    const updatedSubarray = [...unsavedPatientData.metadata[subarrayName]];
    updatedSubarray.splice(index, 1);
    setUnsavedPatientData({ ...unsavedPatientData, metadata: { ...unsavedPatientData.metadata, [subarrayName]: updatedSubarray } });
    // deletePatientField(parseInt(patientData.PID), 'metadata', { [subarrayName]: updatedSubarray });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    onSave(unsavedPatientData); // This will call the `handleSavePatient` function passed as a prop
  };

  const renderSubArrayFields = (subArrayName) => {
    return (unsavedPatientData.metadata[subArrayName] || []).map((item, index) => (
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
