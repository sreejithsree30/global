
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      alert('Login failed',error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
