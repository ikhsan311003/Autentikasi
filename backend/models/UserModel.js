const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "users",
  {
    author: DataTypes.STRING,
    about: DataTypes.STRING,
    note: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

// Sinkronisasi database — hanya aktif jika belum ada
(async () => {
  try {
    await db.sync();
    console.log("✅ User table synced");
  } catch (err) {
    console.error("❌ Sync error:", err.message);
  }
})();

module.exports = User;
