import React, { useState } from 'react';
import './ProviderLoginPage.css'; // Assuming you have a separate CSS file for login page styles

export const ProviderLoginPage = ({setCurrentScreen}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    
    // This is where you could add additional logic specific to provider login if necessary
    if (username && password) {
        // Assuming you have a way to differentiate screens for providers
        setCurrentScreen('provider');
    }
    console.log('Logging in with username:', username, 'and password:', password);
    // Reset form
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  const handleReset = (e) => {
    // Assuming 'home' is a common screen for choosing between patient or provider login
    setCurrentScreen('home');
  }

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

export default ProviderLoginPage;