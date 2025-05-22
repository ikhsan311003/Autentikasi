import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login berhasil!");
      setIsError(false);

      // Delay redirect agar user bisa melihat notifikasi
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login gagal");
      setIsError(true);
    }
  };

  return (
    <div className="container mt-6">
      <div className="column is-half is-offset-one-quarter">
        <div className="box p-5">
          <h2 className="title is-3 has-text-centered has-text-link">
            <i className="fas fa-sign-in-alt mr-2"></i> Masuk Akun Admin
          </h2>

          {message && (
            <div className={`notification ${isError ? "is-danger" : "is-success"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field is-grouped is-grouped-centered mt-5">
              <div className="control">
                <button className="button is-link is-fullwidth">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
