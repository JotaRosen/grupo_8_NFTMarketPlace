const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get("/market", productsController.index);
router.get("/productDetail/:id", productsController.productDetail)

module.exports = router;
