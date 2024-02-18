import React, { useState } from 'react';
import './PatientProfileScreen.css'; // Ensure this path is correctly set to your CSS file

function PatientProfileScreen({ profile }) {
  const [visibleDetail, setVisibleDetail] = useState({});

  const toggleDetail = (section, index) => {
    const key = `${section}-${index}`;
    setVisibleDetail(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const formatSectionName = (section) => {
    if (section === 'labRecords') return 'Lab Records';
    return section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="patient-profile">
      <div className="profile-header">
        <img src={profile.photo} className="profile-photo" alt="profile" />
        <div className="name-and-date">
          <h1 className="profile-name">{profile.name}</h1>
        </div>
      </div>
      <div className="profile-details">
        <p>Date of Birth: {profile.DOB}</p>
        <p>Email: {profile.email}</p>
      </div>
      <div className="profile-section insurance">
        <h2 className="section-title">Insurance</h2>
      </div>
      {['conditions', 'allergies', 'medications', 'procedures', 'immunizations', 'labRecords'].map((section) => (
        <div key={section} className="profile-section">
          <h2 className="section-title">{formatSectionName(section)}</h2>
          <div className="section-content">
            {(profile.metadata[section] || []).map((item, index) => (
              <div key={index} className="section-item">
                <p onClick={() => toggleDetail(section, index)} style={{ cursor: 'pointer' }}>
                  {item.name || item}
                </p>
                {visibleDetail[`${section}-${index}`] && (
                  <div>
                    {Object.keys(item).map((key) => {
                      if (key === 'name') return null; // Do not repeat the name
                      return (
                        <p key={key}><strong>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</strong> {item[key]}</p>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientProfileScreen;
