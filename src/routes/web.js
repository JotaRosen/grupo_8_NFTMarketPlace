const express = require("express");
const router = express.Router();
const path = require("path");
const home = require('../controllers/home'); 

//Routing list
router.get("/", home.show);

router.get("/likes", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "likes.html"))
);

module.exports = router;
