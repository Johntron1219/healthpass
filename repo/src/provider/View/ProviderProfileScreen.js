// PatientProfileScreen.js
import React from 'react';

function ProviderProfileScreen({ profile }) {
  return (
    <div className="provider-profile">
      <img src={profile.photo} className="Profile-photo" alt="profile" />
      <h1>{profile.name}</h1>
      <p>{profile.address}</p>
      <p>{profile.email}</p>
      <section>
        <h2>Insurance Policy</h2>
        <p>Policy Number: {profile.insurancePolicyNumber}</p>
        <p>Plan: {profile.insurancePlan}</p>
      </section>
      <section>
        <h2>Edit History</h2>
        {/* Edit history can be mapped and displayed here */}
      </section>
    </div>
  );
}

export default ProviderProfileScreen;

