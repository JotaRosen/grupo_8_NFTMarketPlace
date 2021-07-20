const express = require("express");
const router = express.Router();
const path = require("path");
const home = require('../controllers/home'); 

//Routing list
router.get("/", home.show);

module.exports = router;
