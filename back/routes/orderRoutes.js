const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authentificateAdmin } = require('../middlewares/authentificator');
const csrfProtection = require('../middlewares/csrf'); 


router.get('/order', authentificateAdmin, orderController.getAllOrders);
router.get('/order/:id', orderController.getOrderById);
router.post('/createOrder', csrfProtection, orderController.createOrder);
router.patch('/order/:id', csrfProtection, authentificateAdmin, orderController.updateOrder);
router.delete('/order/:id', csrfProtection, authentificateAdmin, orderController.deleteOrder);
router.get('/user/orders/:userID', orderController.getUserOrders);
router.get('/orderSearch', authentificateAdmin, orderController.getOrdersWithParams);



module.exports = (app, db) => {
    app.use(router);
};
