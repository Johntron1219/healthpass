import React from 'react';

function ProviderProfileScreen({ profile }) {
  return (
    <div className="provider-profile">
      <div className="profile-header">
        <img src={profile.photo} className="Profile-photo" alt={`${profile.name}`} />
        <h1 className="profile-name">{profile.name}</h1>
      </div>
      <div className="profile-details">
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>NPI:</strong> {profile.NPI}</p>
      </div>
    </div>
  );
}

export default ProviderProfileScreen;
