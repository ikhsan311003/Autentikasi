const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "users",
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Author tidak boleh kosong" },
        len: [2, 100] // Minimal 2 karakter, maksimal 100 karakter
      },
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "About tidak boleh kosong" },
        len: [2, 100]
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Note tidak boleh kosong" },
        len: [5, 1000] // Note lebih panjang, batas aman
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true // Otomatis menambahkan createdAt & updatedAt
  }
);

// Sinkronisasi database (opsional untuk pengembangan)
(async () => {
  try {
    await db.sync();
    console.log("✅ User table synced");
  } catch (err) {
    console.error("❌ Sync error:", err.message);
  }
})();

module.exports = User;
