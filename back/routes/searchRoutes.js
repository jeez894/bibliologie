const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();
require('dotenv').config();

router.get('/api/search', searchController.searchBooks);
router.get('/volume/:id', searchController.getVolumeDetails);
router.get('/api/news', searchController.getNews);
  
module.exports = (app, db) => {
    app.use(router);
  };