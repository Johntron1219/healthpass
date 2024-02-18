import React, { useState } from 'react';
import { createProvider } from '../Backend/createProvider';

export const ProviderRegisterPage = ({ setCurrentScreen, providerNPI }) => {

  const [newNPI, setNewNPI] = useState('');
  const [providerName, setProviderName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!newNPI || !providerName || !password) {
      setErrorMessage('Please enter NPI, name, and password');
      return;
    }

    try {
      await createProvider(newNPI, providerName, password);
      setNewNPI('');
      setProviderName('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error checking document:', error);
      setErrorMessage('An error occurred while checking login');
    }
  };

  const handleBack = () => {
    setCurrentScreen('providerLogin');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Create a Provider Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>NPI:</label>
          <input
            type="text"
            value={newNPI}
            onChange={(e) => setNewNPI(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-group">
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
          <button type="submit" className="login-button">Register!</button>
        </div>
      </form>
    </div>
  );
};

export default ProviderRegisterPage;
