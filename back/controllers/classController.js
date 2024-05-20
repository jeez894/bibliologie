

const mysql = require('promise-mysql');


const getAllClasses = async (req, res) => {
  try {
    const classes = await req.db.query('SELECT * FROM categoriesutilisateur');
    res.status(200).json(classes);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories utilisateur' });
  }
};

const getClassById = async (req, res) => {
  const classId = req.params.id;

  try {
    const category = await req.db.query('SELECT * FROM categoriesutilisateur WHERE classID = ?', [classId]);

    if (category.length === 0) {
      res.status(404).json({ error: 'Catégorie utilisateur non trouvée' });
    } else {
      res.status(200).json(category[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie utilisateur' });
  }
};

const getClassesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const classes = await req.db.query('SELECT * FROM categoriesutilisateur WHERE userID = ?', [userId]);

    if (classes.length === 0) {
      res.status(404).json({ error: 'Aucune classe trouvée pour cet utilisateur' });
    } else {
      res.status(200).json(classes);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des classes par userID :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des classes par userID' });
  }
};

const createClass = async (req, res) => {
  try {
    
    const { userID, name, date_of_creation } = req.body;

    const existingLibraries = await req.db.query(
      'SELECT COUNT(*) AS libraryCount FROM categoriesutilisateur WHERE userID = ?',
      [userID]
    );

    
    if (existingLibraries[0].libraryCount >= 5) {
      return res.status(400).json({ message: 'Vous avez atteint la limite de 5 bibliothèques.' });
    }

    
    const result = await req.db.query('INSERT INTO categoriesutilisateur (userID, name, date_of_creation) VALUES (?, ?, ?)', [userID, name, date_of_creation]);

    
    res.status(201).json({ message: 'Catégorie utilisateur ajoutée avec succès', classId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la catégorie utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la catégorie utilisateur' });
  }
};


const updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const updates = req.body;

    let updateQueries = [];
    let queryParams = [];

    // Créer dynamiquement la requête SQL en fonction des champs fournis
    for (let key in updates) {
      if (updates.hasOwnProperty(key)) {
        updateQueries.push(`${key} = ?`);
        queryParams.push(updates[key]);
      }
    }

    if (updateQueries.length === 0) {
      res.status(400).json({ error: 'Aucune donnée à mettre à jour' });
      return;
    }

    queryParams.push(classId); // Ajouter classId à la fin pour la condition WHERE

    const query = `UPDATE categoriesutilisateur SET ${updateQueries.join(', ')} WHERE classID = ?`;

    await req.db.query(query, queryParams);

    res.status(200).json({ message: 'Catégorie utilisateur mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie utilisateur' });
  }
};



const deleteClass = async (req, res) => {
  const classId = req.params.id;

  try {
    
    const classExists = await req.db.query('SELECT * FROM categoriesutilisateur WHERE classID = ?', [classId]);

    if (classExists.length === 0) {
      return res.status(404).json({ error: 'Catégorie utilisateur non trouvée' });
    }

    
    await req.db.query('DELETE FROM categoriesutilisateur WHERE classID = ?', [classId]);

    res.status(200).json({ success: true, message: 'Catégorie utilisateur supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie utilisateur' });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getClassesByUserId,
};
