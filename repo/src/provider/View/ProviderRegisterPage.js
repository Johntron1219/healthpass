import React, { useState } from 'react';
import {createProvider} from '../Backend/createProvider'

export const ProviderRegisterPage = ({ setCurrentScreen, providerNPI}) => {
  
  const [newNPI, setNewNPI] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Replace the following with your actual login logic
      if (!newNPI|| !password) {
        setErrorMessage('Please enter both email and password');
        return;
      }

    try {
      await createProvider(newNPI, password)
      setNewNPI('');
      setPassword('');
      setErrorMessage('');
      return;
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
