import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    // Add login logic here
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f4f4f4',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>로그인</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <label style={{ marginBottom: '10px', color: '#555' }}>
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 15px 0',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
        <label style={{ marginBottom: '10px', color: '#555' }}>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              margin: '5px 0 15px 0',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
        <button type="submit" style={{
          background: '#62d96b',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;