
/* login page after user has selected 'login as patient'
- offers fields to input username and login
- button to click submit to check authorization of user
*/

import React, { useState } from 'react';

export const PatientLoginPage = ({setCurrentScreen}) => {
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
    
    if (username && password) {
        setCurrentScreen('patient');
    }
    console.log('Logging in with username:', username, 'and password:', password);
    // Reset form
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  const handleReset = (e) => {

    setCurrentScreen('home');
  }
 
  return (
    <div>
      <h2>Login Page</h2>
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

export default PatientLoginPage;