const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { QueryTypes } = require("sequelize");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
    "INSERT INTO admin (username, password, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
    {
        replacements: [username, hashedPassword],
        type: db.QueryTypes.INSERT
    }
    );

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({ error: "Username sudah digunakan" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username dan password wajib diisi" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(404).json({ error: "User tidak ditemukan" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Password salah" });

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    res.json({ message: "Login berhasil", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout berhasil" });
};
