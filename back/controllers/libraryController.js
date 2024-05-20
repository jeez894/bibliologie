const mysql = require('promise-mysql');


const getAllLibraries = async (req, res) => {
  try {
    const libraries = await req.db.query('SELECT * FROM bibliothequeglobale');
    res.status(200).json(libraries);
  } catch (error) {
    console.error('Erreur lors de la récupération des bibliothèques :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des bibliothèques' });
  }
};

const getLibraryById = async (req, res) => {
  const libraryId = req.params.id;

  try {
    const library = await req.db.query('SELECT * FROM bibliothequeglobale WHERE libraryID = ?', [libraryId]);

    if (library.length === 0) {
      res.status(404).json({ error: 'Bibliothèque non trouvée' });
    } else {
      res.status(200).json(library[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la bibliothèque :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la bibliothèque' });
  }
};


const createLibraryEntry = async (req, res) => {
  try {
    
    const { userID, classID, itemID, status } = req.body;
    
    const existingEntries = await req.db.query(
      'SELECT * FROM bibliothequeglobale WHERE userID = ? AND classID = ? AND itemID = ?',
      [userID, classID, itemID]
    );

    if (existingEntries.length > 0) {
      
      return res.status(409).json({ message: 'Cette œuvre est déjà ajoutée à la bibliothèque sélectionnée.' });
    }
    
    const result = await req.db.query('INSERT INTO bibliothequeglobale (userID, classID, itemID, status) VALUES (?, ?, ?, ?)', [userID, classID, itemID, status]);

    
    res.status(201).json({ message: 'Bibliothèque ajoutée avec succès', libraryId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la bibliothèque :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la bibliothèque' });
  }
};

const updateStatusLibrary = async (req, res) => {
  try {
    const { userID, classID, itemID, newStatus } = req.body;

    
    const existingEntry = await req.db.query(
      'SELECT * FROM bibliothequeglobale WHERE userID = ? AND classID = ? AND itemID = ?',
      [userID, classID, itemID]
    );

    if (existingEntry.length === 0) {
      return res.status(404).json({ message: 'Entrée non trouvée avec les identifiants fournis.' });
    }

    
    await req.db.query(
      'UPDATE bibliothequeglobale SET status = ? WHERE userID = ? AND classID = ? AND itemID = ?',
      [newStatus, userID, classID, itemID]
    );

    res.status(200).json({ message: 'Status de l\'œuvre mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du status de l\'œuvre :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du statut.' });
  }
};

const updateLibraryLibrary = async (req, res) => {
  const { userID, itemID, oldClassID, newClassID } = req.body;
  try {
    
    const existingEntry = await req.db.query(
      'SELECT * FROM bibliothequeglobale WHERE userID = ? AND classID = ? AND itemID = ?',
      [userID, oldClassID, itemID]
    );
    if (existingEntry.length === 0) {
      return res.status(404).json({ message: 'Œuvre non trouvée dans la bibliothèque actuelle.' });
    }
    
    
    await req.db.query(
      'UPDATE bibliothequeglobale SET classID = ? WHERE userID = ? AND classID = ? AND itemID = ?',
      [newClassID, userID, oldClassID, itemID]
    );

    res.json({ message: 'Œuvre déplacée avec succès.' });
  } catch (error) {
    console.error('Erreur lors du changement de bibliothèque de l\'œuvre :', error);
    res.status(500).json({ error: 'Erreur lors du changement de bibliothèque.' });
  }
};



const updateLibrary = async (req, res) => {
  try {
    
    const libraryId = req.params.id;

    
    const { userID, classID, itemID, status } = req.body;

    
    await req.db.query('UPDATE bibliothequeglobale SET userID = ?, classID = ?, itemID = ?, status = ? WHERE libraryID = ?', [userID, classID, itemID, status, libraryId]);

    
    res.status(200).json({ message: 'Bibliothèque mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la bibliothèque :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la bibliothèque' });
  }
};


const deleteLibrary = async (req, res) => {
  const libraryId = req.params.id;

  try {
    
    const libraryExists = await req.db.query('SELECT * FROM bibliothequeglobale WHERE libraryID = ?', [libraryId]);

    if (libraryExists.length === 0) {
      return res.status(404).json({ error: 'Bibliothèque non trouvée' });
    }

    
    await req.db.query('DELETE FROM bibliothequeglobale WHERE libraryID = ?', [libraryId]);

    res.status(200).json({ success: true, message: 'Bibliothèque supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la bibliothèque :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la bibliothèque' });
  }
};

const deleteLibraryEntry = async (req, res) => {
  
  const { userId, classId, itemID } = req.params;

  try {
    
    const entryExists = await req.db.query(
      'SELECT * FROM bibliothequeglobale WHERE userID = ? AND classID = ? AND itemID = ?',
      [userId, classId, itemID]
    );

    if (entryExists.length === 0) {
      return res.status(404).json({ message: 'Entrée non trouvée dans la bibliothèque globale.' });
    }

    
    await req.db.query(
      'DELETE FROM bibliothequeglobale WHERE userID = ? AND classID = ? AND itemID = ?',
      [userId, classId, itemID]
    );

    res.status(200).json({ message: 'Entrée supprimée avec succès de la bibliothèque globale.' });
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'entrée :`, error);
    res.status(500).json({ error: `Erreur lors de la suppression de l'entrée de la bibliothèque globale.` });
  }
};



module.exports = {
  getAllLibraries,
  getLibraryById,
  createLibraryEntry,
  updateLibrary,
  deleteLibrary,
  updateStatusLibrary,
  updateLibraryLibrary,
  deleteLibraryEntry,
};
