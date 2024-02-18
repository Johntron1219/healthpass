import React, { useState } from 'react';

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
    <div>
      <h2>Provider Login Page</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <button type="reset">Back</button>
      </form>
    </div>
  );
};

export default ProviderLoginPage;