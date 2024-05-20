const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const rateLimit = require('express-rate-limit');
const { authentificateAdmin } = require('../middlewares/authentificator');
const csrfProtection = require('../middlewares/csrf'); 

const loginLimiter = rateLimit({
  windowMs: 0, //15 * 60 * 1000, // 15 minutes
  max: 5, // Limite chaque IP à 5 tentatives de connexion
  handler: function (req, res /*, next */) {
    res.status(429).json({ error: "Trop de tentatives de connexion. Réessayez dans 5 minutes." });
  }
});


router.get('/admin/users', userController.getAllUsers);
router.get('/user/:id', userController.findUserById);
router.get('/user/:id', userController.getUserById);
router.post('/user/save', csrfProtection, userController.createUser);
router.put('/user/update/:id', csrfProtection, userController.updateUser);
router.delete('/user/delete/:id', csrfProtection, userController.deleteUser);
router.post('/user/login', csrfProtection, loginLimiter, userController.loginUser);



module.exports = (app, db) => {
    app.use(router);
  };