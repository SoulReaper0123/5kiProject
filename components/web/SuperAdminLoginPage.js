import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Super Admin Login:', email, password);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>Super Admin Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default SuperAdminLoginPage;
