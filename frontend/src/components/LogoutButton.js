import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Yakin ingin logout?',
      text: 'Kamu akan keluar dari sesi sekarang.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, logout',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      Swal.fire('Berhasil!', 'Anda telah logout.', 'success');
      navigate("/login");
    }
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
