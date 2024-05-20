const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const csrfProtection = require('../middlewares/csrf'); 

router.get('/item', itemController.getAllItems);
router.get('/item/:id', itemController.getItemById);
router.post('/item', csrfProtection, itemController.createItem);
router.put('/item/:id', csrfProtection, itemController.updateItem);
router.delete('/item/:id', csrfProtection, itemController.deleteItem);
router.get('/item/volume/:volumeId', itemController.getItemByVolumeId);
router.get('/bibliotheque/:userId/:classId', itemController.getItemByClass);

module.exports = (app, db) => {
    app.use(router);
};
