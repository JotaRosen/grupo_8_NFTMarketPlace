const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const loginValidator = require('../middlewares/validLogin');
const multer = require('multer');
const isLogged = require("../middlewares/logged");
const path = require('path');
const registerValidator = require('../middlewares/validRegistration');

let destStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, path.resolve(__dirname,"../../public/img/usersProfile"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});
const upload = multer({storage:destStorage});


router.get("/login", userController.login);
router.get("/register", userController.register);
router.get("/resetPass",userController.resetPass);

router.post("/login", loginValidator,userController.access);
router.post("/register", registerValidator,userController.createUser);

router.get("/profile", userController.userProfile); //profile collection is default
router.get("/profile/Create", userController.userCreate); //should be a post
router.get("/profile/Favs", userController.userFavs);
router.get('/profile/:id/edit',userController.userEdit);

router.get("/profile/settings", userController.userSettings);

router.put("/profile/settings", upload.single('create_image'), userController.userSettingsEdit);

router.get("/profile/:id/remove", userController.userFavsErase)

router.get("/productDetail/:id/add", userController.userAddtoFavs)

router.get("/logout",[isLogged],userController.logout)

module.exports = router;
