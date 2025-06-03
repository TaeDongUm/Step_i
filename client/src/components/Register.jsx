import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 자리
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🏅</div>
        <div style={{ fontWeight: 600, fontSize: 20 }}>RoutineRise</div>
      </div>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 10,
        padding: '32px 32px 16px 32px',
        width: 430,
        boxSizing: 'border-box',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Create an account</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
          Enter your information to get started
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500 }}>First name</label>
            <input
              name="firstName"
              type="text"
              required
              value={form.firstName}
              onChange={handleChange}
              style={{
                width: '100%',
                fontSize: 16,
                padding: '12px 10px',
                marginTop: 4,
                borderRadius: 6,
                border: '1px solid #ddd',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 500 }}>Last name</label>
            <input
              name="lastName"
              type="text"
              required
              value={form.lastName}
              onChange={handleChange}
              style={{
                width: '100%',
                fontSize: 16,
                padding: '12px 10px',
                marginTop: 4,
                borderRadius: 6,
                border: '1px solid #ddd',
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontWeight: 500 }}>Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            style={{
              width: '100%',
              fontSize: 16,
              padding: '12px 10px',
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #ddd',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontWeight: 500 }}>Password</label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            style={{
              width: '100%',
              fontSize: 16,
              padding: '12px 10px',
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #ddd',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontWeight: 500 }}>Confirm password</label>
          <input
            name="confirm"
            type="password"
            required
            value={form.confirm}
            onChange={handleChange}
            style={{
              width: '100%',
              fontSize: 16,
              padding: '12px 10px',
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #ddd',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ margin: '16px 0 18px 0', display: 'flex', alignItems: 'center', fontSize: 15 }}>
          <input
            name="agree"
            type="checkbox"
            checked={form.agree}
            required
            onChange={handleChange}
            style={{ marginRight: 8, width: 16, height: 16 }}
          />
          <span>
            I agree to the <a href="#" style={{ color: '#62d96b', textDecoration: 'none' }}>terms of service</a>
            &nbsp;and&nbsp;
            <a href="#" style={{ color: '#62d96b', textDecoration: 'none' }}>privacy policy</a>
          </span>
        </div>
        <button type="submit"
          style={{
            width: '100%',
            background: '#62d96b',
            color: '#fff',
            fontWeight: 600,
            fontSize: 17,
            border: 'none',
            borderRadius: 6,
            padding: '13px 0',
            cursor: 'pointer',
            marginBottom: 12
          }}>
          Create account
        </button>
        <div style={{ textAlign: 'center', color: '#222', fontSize: 15 }}>
          Already have an account? <a href="#" style={{ color: '#62d96b', textDecoration: 'none', fontWeight: 500 }}>Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Register;