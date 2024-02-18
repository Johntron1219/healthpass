// ApprovalsScreen.js
import React from 'react';
import './ApprovalsScreen.css'; // Ensure this is the correct path to your CSS file

import { useState, useEffect } from 'react';

import {approveProviderHandler, denyProviderHandler, 
  initiateRequestHandler, removeAuthorizationHandler} from '../Backend/authorizationRequestHandler';
import { getAllPatientData } from '../Backend/getRecords/getPatientData';

/*
call backend function that will retrieve 
list of providers associated with patient - this will feed into the react component fields
render the provider data onto the screen
if user clicks approve --> call backend approval function
if user denies --> call backend deny function
*/

/* TODO
- add ability to cancel existing connections
- add confirmation messages for all actions
*/

export const ApprovalsScreen = ({patientID}) => {

  const [authData, setAuthData] = useState([]);
  const [providerList, setProviderList] = useState([]);

  const [initiateRequestNPI, setInitiateRequestNPI] = useState('');

  useEffect(() => {
    fetchData(patientID);
  }, []);

  const fetchData = async (patientID) => {
    try {
      const response = await getAllPatientData(patientID)
      setAuthData(response['incomingauthrequests']);
      setProviderList(response['AuthorizedNPIs'])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //use this for confirmation message const [confirmAuth, setConfirmAuth] = useState(true); 

  return (
    authData ? (
      <div className="approvals-screen">
        <h1>Approvals</h1>
        
        <section className="authorization-requests">
          <h2>Provider Authorization Requests</h2>
          {authData.map((request) => (
            <div key={request.NPI} className="request-item">
              <span>{request.providerName} - {request.requestDate.toDate().toLocaleDateString()}</span>
              <button onClick={() => approveProviderHandler(patientID, request.NPI)}>Approve</button>
              <button onClick={() => denyProviderHandler(patientID, request.NPI)}>Deny</button>
            </div>
          ))}
        </section>
        
        <section className="authorized-providers">
          <h2>List of Authorized Providers</h2>
          {providerList.map((NPI) => (
            <div key={NPI} className="provider-item">
              <span>{NPI}</span>
              <button onClick={() => removeAuthorizationHandler(patientID, NPI)}>Remove</button>
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
          <button onClick={() => initiateRequestHandler(patientID, initiateRequestNPI)}>Submit</button>
        </section>
      </div>
    ) : null
  );
}

export default ApprovalsScreen;
