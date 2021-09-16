const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, path.resolve(__dirname,"../../public/tmp/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});
const upload = multer({storage:dest});


router.get("/market", productsController.index);
router.get("/productDetail/:id", productsController.productDetail);
router.post("/profile/Create", upload.single("create_image") ,productsController.save);

router.put('/profile/:id',upload.single("create_image"),productsController.update); //changing single file name testing purposes
router.delete('/profile/:id',productsController.delete);

module.exports = router;
