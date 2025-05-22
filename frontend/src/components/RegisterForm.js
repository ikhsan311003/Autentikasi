import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        password,
      });
      setMessage(response.data.message);
      setIsError(false);
      setTimeout(() => navigate("/login"), 1500); // redirect otomatis ke login
    } catch (error) {
      setMessage(error.response?.data?.error || "Registrasi gagal");
      setIsError(true);
    }
  };

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <div className="box p-5">
          <h2 className="title is-3 has-text-centered has-text-info">
            <i className="fas fa-user-plus mr-2"></i> Register Admin Baru
          </h2>

          {message && (
            <div className={`notification ${isError ? "is-danger" : "is-success"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Buat username"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat password"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field is-grouped is-grouped-centered mt-5">
              <div className="control">
                <button className="button is-info is-fullwidth">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
