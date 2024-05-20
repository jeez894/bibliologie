const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/verifyToken', authController.verifyToken);

module.exports = (app, db) => {
    app.use(router);
};