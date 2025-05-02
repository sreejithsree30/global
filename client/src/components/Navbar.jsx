
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Task Manager</Link>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        {isAuthenticated ? (
          <li>
            <button className="logout-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
          </li>
        ) : (
          <>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;