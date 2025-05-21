const express      = require("express");
const verifyToken  = require("../middleware/verifyToken"); // ← pakai jika mau proteksi
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

// ---------- PUBLIC (atau tetap bisa diproteksi terserah) ----------
router.get("/", getUsers);
router.get("/:id", getUsersById);

// ---------- PROTEKSI DENGAN JWT ----------
router.post("/", verifyToken, createUser);
router.patch("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
