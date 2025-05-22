import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BASE_URL } from '../utils';
import LogoutButton from "./LogoutButton";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getUsers();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-three-quarters">
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
          <h1 className="title is-3 has-text-link">
            <i className="fas fa-book-open mr-2"></i> Daftar Catatan Pengguna
          </h1>
          <LogoutButton />
        </div>

        <div className="mb-4">
          <Link to={`add`} className='button is-primary is-rounded'>
            <span className="icon">
              <i className="fas fa-plus-circle"></i>
            </span>
            <span>Tambah Catatan</span>
          </Link>
        </div>

        <div className="box has-shadow mt-3">
          {loading ? (
            <progress className="progress is-small is-link" max="100">
              Loading
            </progress>
          ) : (
            <div className="table-container">
              <table className="table is-bordered is-striped is-fullwidth is-hoverable">
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
                        <div className="buttons is-centered">
                          <div className="is-flex is-align-items-center">
                            <Link to={`edit/${user.id}`} className="button is-small is-info mr-1">
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
