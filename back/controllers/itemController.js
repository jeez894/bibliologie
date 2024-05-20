

const mysql = require('promise-mysql');


const getAllItems = async (req, res) => {
  try {
    const items = await req.db.query('SELECT * FROM Oeuvres');
    res.status(200).json(items);
  } catch (error) {
    console.error('Erreur lors de la récupération des oeuvres :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des oeuvres' });
  }
};

const getItemByClass = async (req, res) => {
  const { userId, classId } = req.params;
  try {
    const oeuvres = await req.db.query(
      `SELECT oeuvres.*, bibliothequeglobale.status
      FROM oeuvres 
      JOIN bibliothequeglobale ON oeuvres.itemID = bibliothequeglobale.itemID 
      WHERE bibliothequeglobale.userID = ? AND bibliothequeglobale.classID = ?`, 
      [userId, classId]
    );
    res.json(oeuvres);
  } catch (error) {
    console.error('Erreur lors de la récupération des œuvres :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des œuvres' });
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await req.db.query('SELECT * FROM Oeuvres WHERE itemID = ?', [itemId]);

    if (item.length === 0) {
      res.status(404).json({ error: 'Oeuvre non trouvée' });
    } else {
      res.status(200).json(item[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'oeuvre :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'oeuvre' });
  }
};


const createItem = async (req, res) => {
  try {
      
      const { volumeID, title, description, url_api } = req.body;

      
      const result = await req.db.query('INSERT INTO Oeuvres (volumeID, title, description, apiURL) VALUES (?, ?, ?, ?)', [volumeID, title, description, url_api]);

      
      res.status(201).json({ message: 'Oeuvre ajoutée avec succès', itemID: result.insertId });
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'oeuvre :', error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'oeuvre' });
  }
};

const getItemByVolumeId = async (req, res) => {
  const volumeId = req.params.volumeId;

  try {
    const item = await req.db.query('SELECT * FROM Oeuvres WHERE volumeID = ?', [volumeId]);

    if (item.length === 0) {
      res.status(404).json({ error: 'Oeuvre non trouvée' });
    } else {
      res.status(200).json(item[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'oeuvre :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'oeuvre' });
  }
};


const updateItem = async (req, res) => {
  try {
      
      const itemId = req.params.id;

      
      const { title, description, url_api } = req.body;

      
      await req.db.query('UPDATE Oeuvres SET title = ?, description = ?, apiURL = ? WHERE itemID = ?', [title, description, url_api, itemId]);

      
      res.status(200).json({ message: 'Oeuvre mise à jour avec succès' });
  } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'oeuvre :', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'oeuvre' });
  }
};


const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    
    const itemExists = await req.db.query('SELECT * FROM Oeuvres WHERE itemID = ?', [itemId]);

    if (itemExists.length === 0) {
      return res.status(404).json({ error: 'Oeuvre non trouvée' });
    }

    
    await req.db.query('DELETE FROM Oeuvres WHERE itemID = ?', [itemId]);

    res.status(200).json({ success: true, message: 'Oeuvre supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'oeuvre :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'oeuvre' });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemByVolumeId,
  getItemByClass
};
