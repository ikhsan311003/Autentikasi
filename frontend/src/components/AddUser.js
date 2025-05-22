import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AddUser = () => {
  const [author, setAuthor] = useState("");
  const [about, setAbout] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/users`,
        { author, about, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsError(false);
      setMessage("Catatan berhasil disimpan.");
      setTimeout(() => navigate("/users"), 1000);
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Gagal membuat catatan. Periksa panjang karakter dan coba lagi.";
      setMessage(msg);
      setIsError(true);
    }
  };

  return (
    <div className="columns is-centered mt-6 mx-2">
      <div className="column is-12-mobile is-8-tablet is-6-desktop">
        <div className="box p-5">
          <h1 className="title is-4-mobile is-3-tablet has-text-centered has-text-success">
            <i className="fas fa-plus-circle mr-2"></i> Tambah Catatan
          </h1>

          {message && (
            <div className={`notification ${isError ? "is-danger" : "is-success"} is-light`}>
              {message}
            </div>
          )}

          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Author</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nama penulis (min 3 karakter)"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">About</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Topik catatan (min 3 karakter)"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Note</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Isi catatan (min 5 karakter)"
                  required
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped is-justify-content-end is-flex-wrap-wrap mt-5">
              <div className="control mb-2 mr-2">
                <Link to="/users" className="button is-light is-fullwidth">
                  Batal
                </Link>
              </div>
              <div className="control mb-2">
                <button type="submit" className="button is-success is-fullwidth">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
