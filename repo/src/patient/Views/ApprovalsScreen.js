// ApprovalsScreen.js
import React from 'react';

import {approveProviderHandler, denyProviderHandler} from '../Backend/authorizationRequestHandler';
import createAccessLink from '../Backend/createAccessLink';


/*
call backend function that will retrieve 
list of providers associated with patient - this will feed into the react component fields
render the provider data onto the screen
if user clicks approve --> call backend approval function
if user denies --> call backend deny function
*/

const providerAuthorizationRequests = [
  { id: 1, providerName: "Dr. Smith", requestDate: "2024-02-15" },
  { id: 2, providerName: "Dr. Johnson", requestDate: "2024-02-14" }
];

// Functions to handle approvals and creating access links

function ApprovalsScreen() {

  return (
    <div className="approvals-screen">
      <div>
        <h1>Approvals</h1>
        <div className="approval-item">
          <h2>Provider Authorization Requests</h2>
          {providerAuthorizationRequests.map((request) => (
            <div key={request.id} className="request-item">
              {request.providerName} - {request.requestDate}
            </div>
          ))}
        </div>
        <button className="A-pink-button" onClick={approveProviderHandler}>Approve</button>
        <button className="A-pink-button" onClick={denyProviderHandler}>Deny</button>
      </div> 
      <div>
        <button className="A-pink-button" onClick={createAccessLink}>Create Access Link</button>
      </div>
    </div>
  );
}

export default ApprovalsScreen;
