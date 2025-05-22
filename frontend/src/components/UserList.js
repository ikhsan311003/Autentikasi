import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { BASE_URL } from '../utils';
import LogoutButton from "./LogoutButton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(`${BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus catatan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${BASE_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Berhasil!', 'Catatan telah dihapus.', 'success');
        getUsers();
      } catch (error) {
        Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
      }
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-11-mobile is-10-tablet is-8-desktop">
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4 is-flex-wrap-wrap">
          <h1 className="title is-3 has-text-link">
            <i className="fas fa-book-open mr-2"></i> Daftar Catatan Pengguna
          </h1>
          <LogoutButton />
        </div>

        <div className="mb-4">
          <Link to="/add" className="button is-primary is-rounded">
            <span className="icon">
              <i className="fas fa-plus-circle"></i>
            </span>
            <span>Tambah Catatan</span>
          </Link>
        </div>

        <div className="box has-shadow mt-3">
          {loading ? (
            <progress className="progress is-small is-link" max="100">
              Loading...
            </progress>
          ) : users.length === 0 ? (
            <p className="has-text-centered has-text-grey">
              Tidak ada catatan yang tersedia.
            </p>
          ) : (
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth is-hoverable is-size-7-touch">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Author</th>
                    <th>About</th>
                    <th>Note</th>
                    <th className="has-text-centered">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.author}</td>
                      <td>{user.about}</td>
                      <td>{user.note}</td>
                      <td className="has-text-centered">
                        <div className="is-flex is-justify-content-center is-align-items-center is-flex-wrap-nowrap" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
                          <Link to={`/edit/${user.id}`} className="button is-small is-info">
                            <span className="icon">
                              <i className="fas fa-edit"></i>
                            </span>
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="button is-small is-danger"
                          >
                            <span className="icon">
                              <i className="fas fa-trash"></i>
                            </span>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
