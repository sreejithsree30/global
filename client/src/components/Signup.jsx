
import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/signup', formData);
      navigate('/login');
    } catch (error) {
      alert('Signup failed',error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
