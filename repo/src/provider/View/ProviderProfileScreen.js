import React from 'react';
import './providerCSS/ProviderProfileScreen.css'; // Make sure this path is correct

function ProviderProfileScreen({ profile }) {
  return (
    <div className="provider-profile-card">
      <div className="profile-card-header">
        <img src={profile.photo} className="profile-photo" alt={`${profile.name} profile`} />
        <h1 className="profile-name">{profile.name}</h1>
      </div>
      <div className="profile-card-details">
        <p className="profile-detail"><strong>NPI:</strong> {profile.NPI}</p>
      </div>
    </div>
  );
}

export default ProviderProfileScreen;