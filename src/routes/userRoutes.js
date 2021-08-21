const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const loginValidator = require('../middlewares/validLogin');
const registerValidator = require('../middlewares/validRegistration');

router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/resetPass",userController.resetPass);

router.post("/login", loginValidator,userController.access);
router.post("/register", registerValidator,userController.createUser);

router.get("/profile", userController.userProfile); //profile collection is default
router.get("/profile/Create", userController.userCreate); //should be a post
router.get("/profile/Favs", userController.userFavs);
router.get('/profile/:id/edit',userController.userEdit);

router.get("/profile/:id/remove", userController.userFavsErase)


module.exports = router;
