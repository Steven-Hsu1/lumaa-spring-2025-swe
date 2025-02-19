const express = require("express");
const router = express.Router();

// Sign up route
router.post("/", (req, res) => {
  // Handle sign up logic here
  res.send("Sign up route");
});

module.exports = router;
