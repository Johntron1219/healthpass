import React, { useState } from 'react';
import './providerCSS/ProviderLoginPage.css'; // Assuming ProviderLoginPage will use the same styles

export const ProviderLoginPage = ({ setCurrentScreen, setCurrentID}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    // Additional login logic for providers...
    setCurrentScreen('provider');
    setCurrentID(username)
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const handleRegister = () => {
    // Redirect to registration logic for providers
    console.log('Redirect to provider registration screen');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Provider Login Page</h2>
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
