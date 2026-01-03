const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

const adminOnly = require("../middleware/adminOnly");



// create new product/yeni urun olustur
router.get("/products/create", adminOnly, productControllers.createForm);
router.post("/products/create", adminOnly, productControllers.create);

// update/guncele
router.get("/products/edit/:id", adminOnly, productControllers.editForm);
router.post("/products/update/:id", adminOnly, productControllers.update);

// delete/sil
router.get("/products/delete/:id", adminOnly, productControllers.deleteForm);
router.post("/products/delete/:id", adminOnly, productControllers.delete);

 
router.get('/products', productControllers.index); // ana dizi
router.get('/products/:id', productControllers.show); // Uruner sayfasi

module.exports = router;
