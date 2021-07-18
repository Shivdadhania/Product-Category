const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

router.post('/create',productController.createProduct);

router.get('/readAll', productController.getProducts);




router.get('/read/:productId', productController.getProduct);

router.post('/update/:productId',productController.updateProduct);

router.delete('/delete/:productId', productController.deleteProduct);

module.exports = router;
