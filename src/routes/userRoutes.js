const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/resetPass", userController.resetPass);

router.get("/profile", userController.userProfile); //profile collection is default
router.get("/profile/Create", userController.userCreate); //should be a post
router.get("/profile/Favs", userController.userFavs);
router.get('/profile/:id/edit',userController.userEdit);



module.exports = router;
