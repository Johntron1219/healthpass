// ApprovalsScreen.js
import React from 'react';

import { useState, useEffect } from 'react';

import {approveProviderHandler, denyProviderHandler, initiateRequestHandler, removeAuthorizationHandler} from '../Backend/authorizationRequestHandler';
import createAccessLink from '../Backend/createAccessLink';
import { getAllPatientData } from '../Backend/getPatientData';



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
    authData ? (<div className="approvals-screen">
      <div>
        <h1>Approvals</h1>
        <div className="approval-item">
          <h2>Provider Authorization Requests</h2>
          {authData.map((request) => (
            <div key={request.NPI} className="request-item">
              {request.providerName} - {request.requestDate.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
              <button className="A-pink-button" onClick={() => approveProviderHandler(patientID, request.NPI)}>Approve</button>

              <button className="A-pink-button" onClick={() => denyProviderHandler(patientID, request.NPI)}>Deny</button>
              
            </div>
          ))}
        </div>
        </div> 
        <div className="provider-list" style ={{display: 'block'}}>
          <h2>List of Authorized Providers</h2>
          {providerList.map((NPI) => (
            <div key={NPI} style={{display: 'inline'}}> 
              <p> 
                {NPI} 
                <button onClick={() => removeAuthorizationHandler(patientID, NPI)}>Remove</button>
              </p> 
            </div>))}
        </div>

        <div className="provider-list">
          <div>
          <label>Connect with provider NPI: 
            <input
                type="text"
                value={initiateRequestNPI}
                onChange={(e) => setInitiateRequestNPI(e.target.value)}
                placeholder="Enter text..."
            />
            <button onClick={() => initiateRequestHandler(patientID, initiateRequestNPI)}>Submit</button>
          </label>
          </div>
          
        </div>
    </div>) : null
  );
}

export default ApprovalsScreen;
