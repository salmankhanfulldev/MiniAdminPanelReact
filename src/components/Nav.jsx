import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Nav() {
  const { auth, logout } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="nav">
      <div className="nav-brand">Mini Admin</div>
      <div className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </div>
      <div className="nav-user">
        <span>{auth.user?.name || 'Guest'}</span>
        <button className="btn small" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}