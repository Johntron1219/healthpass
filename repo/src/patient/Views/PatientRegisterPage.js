import React, { useState } from 'react';
import {checkIfDocumentExists} from '../Backend/loginAuthorization'
import {createPatient} from '../Backend/createPatient'

export const PatientRegisterPage = ({ setCurrentScreen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Replace the following with your actual login logic
      if (!email|| !password) {
        setErrorMessage('Please enter both email and password');
        return;
      }

    try {
      await createPatient(email, password, name, DOB)
      setEmail('');
      setPassword('');
      setName('');
      setDOB('');
      setErrorMessage('');

      return;
    } catch (error) {
        console.error('Error checking document:', error);
        setErrorMessage('An error occurred while checking login');
    }
  };

  const handleBack = () => {
    setCurrentScreen('patientLogin');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Create a Patient Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Date of Birth:</label>
          <input
            type="text"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
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

export default PatientRegisterPage;
