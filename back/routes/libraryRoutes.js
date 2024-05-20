const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const csrfProtection = require('../middlewares/csrf'); 

router.get('/libraries', libraryController.getAllLibraries);
router.get('/libraries/:id', libraryController.getLibraryById);
router.post('/libraries', csrfProtection, libraryController.createLibraryEntry);
router.put('/libraries/:id', csrfProtection, libraryController.updateLibrary);
router.delete('/libraries/:id', csrfProtection, libraryController.deleteLibrary);
router.put('/libraries/:userId/:classId/:itemID', csrfProtection, libraryController.updateStatusLibrary);
router.put('/librariesLibrary/:userId/:classId/:itemID', csrfProtection, libraryController.updateLibraryLibrary);
router.delete('/deleteLibraryEntry/:userId/:classId/:itemID', csrfProtection, libraryController.deleteLibraryEntry);

module.exports = (app, db) => {
    app.use(router);
};
