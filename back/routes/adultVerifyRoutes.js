
const express = require('express');
const router = express.Router();
const { verifyAdult } = require('../middlewares/adultVerify');

router.get('/adultVerify', verifyAdult, (req, res) => {
    const isAdultVerified = req.isAdultVerified; 
    res.json({ isAdultVerified: isAdultVerified }); 
});

module.exports = (app, db) => {
    app.use(router);
};
