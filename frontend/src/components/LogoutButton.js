import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="button is-danger is-light is-rounded is-small ml-3 px-3 py-2 has-shadow"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        border: '1px solid #ff3860',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <span className="icon has-text-danger">
        <i className="fas fa-sign-out-alt"></i>
      </span>
      <span className="has-text-weight-semibold has-text-danger">Logout</span>
    </button>
  );
};

export default LogoutButton;
