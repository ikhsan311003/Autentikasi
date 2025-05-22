import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="button is-light is-small ml-2">
      <span className="icon">
        <i className="fas fa-sign-out-alt"></i>
      </span>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
