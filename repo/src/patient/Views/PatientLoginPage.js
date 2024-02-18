import React, { useState, useEffect } from 'react';
import './PatientLoginPage.css'; // Assuming you have a separate CSS file for login page styles
import database from '../../firebase'
import {checkIfDocumentExists} from '../Backend/loginAuthorization'

export const PatientLoginPage = ({ setCurrentScreen, setCurrentID}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Replace the following with your actual login logic
      if (!username || !password) {
        setErrorMessage('Please enter both username and password');
        return;
      }

    try {
      const documentExists = await checkIfDocumentExists(username);
      if (documentExists) {
        console.log('Logging in with username:', username, 'and password:', password);
        setCurrentScreen('patient');
        setCurrentID(username);
        // Reset form fields
      } else {
        setErrorMessage('Invalid login');
        return;
      }
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
        console.error('Error checking document:', error);
        setErrorMessage('An error occurred while checking login');
    }
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    // Implement or redirect to registration logic
    console.log('Redirect to registration screen');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
          <button type="button" className="register-button" onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default PatientLoginPage;
