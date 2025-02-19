const express = require("express");
const router = express.Router();

// Login route
router.post("/", (req, res) => {
  // Handle login logic here
  res.send("Login route");
});

module.exports = router;
