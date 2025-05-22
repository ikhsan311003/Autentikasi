import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const EditUser = () => {
  const [author, setAuthor] = useState("");
  const [about, setAbout] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserById = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthor(response.data.author);
      setAbout(response.data.about);
      setNote(response.data.note);
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/users");
    }
  }, [id, navigate]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/users/${id}`,
        { author, about, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="columns mt-6 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title is-3 has-text-centered has-text-warning">
            <i className="fas fa-edit mr-2"></i> Edit Catatan
          </h1>
          <form onSubmit={updateUser}>
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
                <button type="submit" className="button is-warning">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
