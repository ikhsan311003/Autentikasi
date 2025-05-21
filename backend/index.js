require("dotenv").config();
console.log("🚀 Starting server... loading dependencies...");

const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

// ✅ Tambahkan log saat cek koneksi
console.log("🧪 Checking database connection...");

db.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });
