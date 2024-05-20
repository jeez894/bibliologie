const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const csrfProtection = require('../middlewares/csrf'); 

router.get('/classes', classController.getAllClasses);
router.get('/classes/:id', classController.getClassById);
router.post('/classes', csrfProtection, classController.createClass);
router.put('/classes/:id', csrfProtection, classController.updateClass);
router.delete('/classes/:id', csrfProtection, classController.deleteClass);
router.get('/classes/user/:userId', classController.getClassesByUserId);

module.exports = (app, db) => {
    app.use(router);
};
