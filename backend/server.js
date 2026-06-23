require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user.route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BillSync Backend Running");
});

app.use("/api/users", userRoutes);

const sql = require("./database/db");

app.get("/test-db", async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});