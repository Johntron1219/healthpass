import React, { useState, useEffect } from 'react';
import { getProviderData } from '../Backend/getProviderData';
import {
  approvePatientHandler,
  denyPatientHandler,
  initiateRequestHandler,
  removeAuthorizationHandler
} from '../Backend/authorizationRequestHandler';

function RequestsScreen({ providerNPI }) {
  const [authData, setAuthData] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [initiateRequestPID, setInitiateRequestPID] = useState('');

  useEffect(() => {
    fetchData(providerNPI);
  }, [providerNPI]);

  const fetchData = async (NPI) => {
    try {
      const response = await getProviderData(NPI);
      setAuthData(response?.incomingrequests || []);
      setPatientList(response?.AuthorizedPatients || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set authData and patientList to empty arrays in case of error
      setAuthData([]);
      setPatientList([]);
    }
  };

  const handleApprove = async (PID) => {
    await approvePatientHandler(providerNPI, PID);
    fetchData(providerNPI);
  };

  const handleDeny = async (PID) => {
    await denyPatientHandler(providerNPI, PID);
    fetchData(providerNPI);
  };

  const handleRemove = async (PID) => {
    await removeAuthorizationHandler(providerNPI, PID);
    fetchData(providerNPI);
  };

  const handleInitiateRequest = async () => {
    await initiateRequestHandler(providerNPI, initiateRequestPID);
    setInitiateRequestPID('');
    fetchData(providerNPI);
  };

  return (
    <div className="requests-screen">
      <h1>Patient Share Record Requests</h1>

      <section className="request-item">
        <h2>Patient Requests</h2>
        {Array.isArray(authData) && authData.map((request) => (
          <div key={request.PID} className="request-item">
            <span>{request.patientName} - {new Date(request.requestDate).toLocaleDateString()}</span>
            <button onClick={() => handleApprove(request.PID)}>Approve</button>
            <button onClick={() => handleDeny(request.PID)}>Deny</button>
          </div>
        ))}
      </section>
      
      <section className="authorized-providers">
        <h2>List of Authorized Patients</h2>
        {Array.isArray(patientList) && patientList.map((PID) => (
          <div key={PID} className="provider-item">
            <span>{PID}</span>
            <button onClick={() => handleRemove(PID)}>Remove</button>
          </div>
        ))}
      </section>

      <section className="connect-provider">
        <label htmlFor="providerNPI">Connect with patient ID:</label>
        <input
          id="providerNPI"
          type="text"
          value={initiateRequestPID}
          onChange={(e) => setInitiateRequestPID(e.target.value)}
          placeholder="Enter NPI..."
        />
        <button onClick={handleInitiateRequest}>Submit</button>
      </section>
    </div>
  );
}

export default RequestsScreen;
