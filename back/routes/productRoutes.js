const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authentificateAdmin, authentificateAdult } = require('../middlewares/authentificator');
const csrfProtection = require('../middlewares/csrf'); 

router.get('/getAllProduct', authentificateAdult, productController.getAllProducts);
router.get('/product/search/ID/:id', authentificateAdult, productController.getProductById);
router.post('/createProduct', csrfProtection, authentificateAdmin, productController.createProduct);
router.patch('/updateProduct/:id', csrfProtection, authentificateAdmin, productController.updateProduct);
router.delete('/deleteProduct/:id', csrfProtection, authentificateAdmin, productController.deleteProduct);
router.get('/product/search/title/:title', authentificateAdult, productController.getProductByTitle);
router.get('/product/search/author/:author', authentificateAdult, productController.getProductByAuthor);
router.get('/product/search/tags/:tag', authentificateAdult, productController.getProductByTags);
router.get('/product/search/parution/:parutionDate', authentificateAdult, productController.getProductByParutionDate);
router.get('/searchProduct', authentificateAdult, productController.searchProducts);
router.get('/products/latest', authentificateAdult, productController.getLatestProducts);

module.exports = (app, db) => {
    app.use(router);
  };