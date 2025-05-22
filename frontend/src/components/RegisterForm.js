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
      if (response.status === 201) {
        setMessage("Registrasi berhasil! Mengarahkan ke login...");
        setIsError(false);
        setTimeout(() => navigate("/login"), 1500);
      }
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
            <i className="fas fa-user-plus mr-2"></i> Daftar Admin Baru
          </h2>

          {message && (
            <div className={`notification ${isError ? "is-danger" : "is-success"}`}>{message}</div>
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
                  placeholder="Masukkan username"
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
                  placeholder="Masukkan password"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field mt-5">
              <button type="submit" className="button is-info is-fullwidth">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
