import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Login berhasil!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login gagal");
    }
  };

  return (
    <div className="container is-max-desktop mt-6">
      <div className="box p-6">
        <h2 className="title is-3 has-text-centered">Login Admin</h2>
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
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <div className="field mt-5">
            <button className="button is-primary is-fullwidth" type="submit">
              Login
            </button>
          </div>
          {message && (
            <p className={`has-text-${message.includes("berhasil") ? "success" : "danger"} has-text-centered mt-3`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
