import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
      setMessage("Login berhasil! Mengarahkan...");
      setIsError(false);
      setTimeout(() => navigate("/users"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login gagal");
      setIsError(true);
    }
  };

  return (
    <div className="container is-max-desktop mt-6">
      <div className="box p-6">
        <h2 className="title is-3 has-text-centered has-text-link">
          <i className="fas fa-sign-in-alt mr-2"></i> Login Admin
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
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
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
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="field mt-5">
            <button className="button is-link is-fullwidth" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="has-text-centered mt-4">
          <p>
            Belum punya akun? {" "}
            <Link to="/register" className="has-text-link has-text-weight-semibold">
              Register di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
