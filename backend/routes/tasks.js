const express = require("express");
const router = express.Router();

// Tasks route
router.get("/", (req, res) => {
  // Handle fetching tasks here
  res.send("Tasks route");
});

module.exports = router;
