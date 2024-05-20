const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');
const csrfProtection = require('../middlewares/csrf'); 

router.get('/order-details', orderDetailController.getAllOrderDetails);
router.get('/order-details/:id', orderDetailController.getOrderDetailById);
router.post('/createOrderDetail', csrfProtection, orderDetailController.createOrderDetail);
router.put('/order-details/:id', csrfProtection, orderDetailController.updateOrderDetail);
router.delete('/order-details/:id', csrfProtection, orderDetailController.deleteOrderDetail);
router.get('/orderDetails/:orderID', orderDetailController.getOrderDetailByOrderId);



module.exports = (app, db) => {
    app.use(router);
};
