// ApprovalsScreen.js
import React from 'react';

import { useState, useEffect } from 'react';

import {approveProviderHandler, denyProviderHandler} from '../Backend/authorizationRequestHandler';
import createAccessLink from '../Backend/createAccessLink';
import { getAllPatientData } from '../Backend/getPatientData';



/*
call backend function that will retrieve 
list of providers associated with patient - this will feed into the react component fields
render the provider data onto the screen
if user clicks approve --> call backend approval function
if user denies --> call backend deny function
*/

// Functions to handle approvals and creating access links


const approveProvider = ({setConfirmAuth}) => {
  
}

export const ApprovalsScreen = ({patientID}) => {

  const [authData, setAuthData] = useState([]);
  const [providerList, setProviderList] = useState([]);

  const [initiateRequestNPI, setInitiateRequestNPI] = useState('');

  useEffect(() => {
    fetchData(patientID);

    // Unsubscribe from real-time updates when component unmounts
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

  const initiateAuthRequest = (e) => {
    setInitiateRequestNPI('')
  }

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
        <div style={{display: 'block'}} className="provider-list">
          <h2>List of Authorized Providers</h2>
          {providerList.map((NPI) => (<p> {NPI} </p>))}
        </div>
        <button className="A-pink-button" onClick={createAccessLink}>Create Access Link</button>
        <div className="provider-list">
          
          <form onSubmit={initiateAuthRequest}>
          <label>Connect with provider NPI: 
            <input
                type="text"
                value={initiateRequestNPI}
                onChange={(e) => setInitiateRequestNPI(e.target.value)}
                placeholder="Enter text..."
            />
            <button type="submit">Submit</button>
          </label>
          </form>
          
        </div>
    </div>) : null
  );
}

export default ApprovalsScreen;
