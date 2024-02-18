import React, { useState, useEffect } from 'react';
import './ApprovalsScreen.css'; // Ensure this is the correct path to your CSS file

import {approveProviderHandler, denyProviderHandler, 
  initiateRequestHandler, removeAuthorizationHandler} from '../Backend/authorizationRequestHandler';
import { getAllPatientData } from '../Backend/getRecords/getPatientData';

export const ApprovalsScreen = ({ patientID }) => {
  const [authData, setAuthData] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [initiateRequestNPI, setInitiateRequestNPI] = useState('');

  useEffect(() => {
    fetchData(patientID);
  }, [patientID]); // Dependency array with patientID to refetch when it changes

  const fetchData = async (patientID) => {
    try {
      const response = await getAllPatientData(patientID);
      setAuthData(response['incomingauthrequests']);
      setProviderList(response['AuthorizedNPIs']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApprove = async (NPI) => {
    await approveProviderHandler(patientID, NPI);
    fetchData(patientID); // Refresh the data after action
  };

  const handleDeny = async (NPI) => {
    await denyProviderHandler(patientID, NPI);
    fetchData(patientID); // Refresh the data after action
  };

  const handleRemove = async (NPI) => {
    await removeAuthorizationHandler(patientID, NPI);
    fetchData(patientID); // Refresh the data after action
  };

  const handleInitiateRequest = async () => {
    await initiateRequestHandler(patientID, initiateRequestNPI);
    setInitiateRequestNPI(''); // Clear the input after submission
    fetchData(patientID); // Refresh the data after action
  };

  return (
    <div className="approvals-screen">
      <h1>Approvals</h1>
      
      <section className="authorization-requests">
        <h2>Provider Authorization Requests</h2>
        {authData.map((request) => (
          <div key={request.NPI} className="request-item">
            <span>{request.providerName} - {new Date(request.requestDate).toLocaleDateString()}</span>
            <button onClick={() => handleApprove(request.NPI)}>Approve</button>
            <button onClick={() => handleDeny(request.NPI)}>Deny</button>
          </div>
        ))}
      </section>
      
      <section className="authorized-providers">
        <h2>List of Authorized Providers</h2>
        {providerList.map((NPI) => (
          <div key={NPI} className="provider-item">
            <span>{NPI}</span>
            <button onClick={() => handleRemove(NPI)}>Remove</button>
          </div>
        ))}
      </section>

      <section className="connect-provider">
        <label htmlFor="providerNPI">Connect with provider NPI:</label>
        <input
          id="providerNPI"
          type="text"
          value={initiateRequestNPI}
          onChange={(e) => setInitiateRequestNPI(e.target.value)}
          placeholder="Enter NPI..."
        />
        <button onClick={handleInitiateRequest}>Submit</button>
      </section>
    </div>
  );
}

export default ApprovalsScreen;
