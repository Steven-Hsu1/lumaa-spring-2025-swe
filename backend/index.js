const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Import routes
const loginRoutes = require("./routes/login");
const tasksRoutes = require("./routes/tasks");
const signUpRoutes = require("./routes/signUp");

// Use routes
app.use("/api/login", loginRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/signup", signUpRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
