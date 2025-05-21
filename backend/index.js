require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Gunakan PORT dari Cloud Run, fallback ke 8080 saat lokal
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
