const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const loginValidator = require('../middlewares/validLogin');
const multer = require('multer');
const isLogged = require("../middlewares/logged");
const path = require('path');
const registerValidator = require('../middlewares/validRegistration');
const userEditSettingValidator = require('../middlewares/userEditSettingValidator');

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

router.get("/profile", [isLogged],userController.userProfile); //profile collection is default
router.get("/profile/Create", [isLogged],userController.userCreate);
router.get("/profile/Favs", [isLogged],userController.userFavs);
router.get('/profile/:id/edit',[isLogged],userController.userEdit);

router.get("/profile/settings", [isLogged],userController.userSettings);

router.put("/profile/settings", upload.single('create_image'),[isLogged, userEditSettingValidator], userController.userSettingsEdit);

router.get("/profile/:id/remove", [isLogged] ,userController.userFavsErase)

router.get("/productDetail/:id/add", userController.userAddtoFavs)

router.get("/logout",[isLogged],userController.logout)

module.exports = router;
