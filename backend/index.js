require("dotenv").config(); 

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");
const db = require("./config/database"); // ⬅️ Import koneksi database

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

// ✅ Cek koneksi database sebelum jalanin server
db.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // ⬅️ Hentikan container jika koneksi DB gagal
  });
