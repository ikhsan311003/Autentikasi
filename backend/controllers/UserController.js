const User = require("../models/UserModel");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error("GET users error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
  }
};

// GET single user by ID
exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("GET user by ID error:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data." });
  }
};

// POST create new user note
exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "Catatan berhasil dibuat." });
  } catch (error) {
    console.error("Create user error:", error.message);
    res.status(500).json({ error: "Gagal membuat catatan." });
  }
};

// PATCH update user note
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil diperbarui." });
  } catch (error) {
    console.error("Update user error:", error.message);
    res.status(500).json({ error: "Gagal memperbarui catatan." });
  }
};

// DELETE user note
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Catatan tidak ditemukan." });
    }
    res.status(200).json({ message: "Catatan berhasil dihapus." });
  } catch (error) {
    console.error("Delete user error:", error.message);
    res.status(500).json({ error: "Gagal menghapus catatan." });
  }
};
