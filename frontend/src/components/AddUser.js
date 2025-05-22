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
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/users`,
        { author, about, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-6 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title is-3 has-text-centered has-text-success">
            <i className="fas fa-plus-circle mr-2"></i> Tambah Catatan
          </h1>

          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Author</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nama penulis"
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
                  placeholder="Topik catatan"
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
                  placeholder="Isi catatan"
                  required
                ></textarea>
              </div>
            </div>

            <div className="field is-grouped is-justify-content-end mt-5">
              <div className="control">
                <Link to="/users" className="button is-light">
                  Batal
                </Link>
              </div>
              <div className="control">
                <button type="submit" className="button is-success">
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
