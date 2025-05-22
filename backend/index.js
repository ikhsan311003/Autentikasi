require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Fallback port jika PORT dari env tidak terbaca
const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
