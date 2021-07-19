const express = require("express");
const router = express.Router();
const path = require("path");
const home = require('../controllers/home'); 
const userController = require('../controllers/userController');

//Routing list
router.get("/", home.show);

router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/resetPass", userController.resetPass);
router.get("/profile", userController.userProfile);
router.get("/profileCreate", userController.userCreate);
router.get("/profileFavs", userController.userFavs);

router.get("/likes", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../views", "likes.html"))
);

module.exports = router;
