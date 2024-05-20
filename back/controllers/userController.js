

const mysql = require('promise-mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsers = async (req, res) => {
  try {
    const users = await req.db.query('SELECT * FROM Utilisateurs');
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

async function findUserById(userID, db) {
  try {
    
    const rows = await db.query('SELECT * FROM Utilisateurs WHERE userID = ?', [userID]);
    
    const result = rows[0];

    
    if (rows.length === 0) {
      return null; 
    } else {
      
      return result;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    throw error; 
  }
};


const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await req.db.query('SELECT * FROM Utilisateurs WHERE userID = ?', [userId]);

    if (user.length === 0) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
      res.status(200).json(user[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};


const createUser = async (req, res) => {
  try {
    const { email, status, date_of_birth, password, adult } = req.body;

    const existingUser = await req.db.query('SELECT email FROM utilisateurs WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email déjà utilisé' });
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const result = await req.db.query('INSERT INTO utilisateurs (email, status, date_of_birth, password, adult) VALUES (?, ?, ?, ?, ?)', [email, status, date_of_birth, hashedPassword, adult]);

    res.json({status:'201', msg: 'Utilisateur ajouté avec succès', userId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
  }
};


const updateUser = async (req, res) => {
  try {
    console.log("Entrée dans le controller");
    const userId = req.params.id;
    const { email, status, date_of_birth, password, adult } = req.body;
    const updates = {};
    const params = [];

    if (email) {
        updates.email = email;
    }
    if (status) {
        updates.status = status;
    }
    if (date_of_birth) {
        updates.date_of_birth = date_of_birth;
    }
    if (adult !== undefined) {  // Gérer explicitement la valeur 'false' pour le booléen
        updates.adult = adult;
    }
    // Assurer que les clés des updates sont bien prévues pour éviter toute injection SQL
    const allowedFields = ['email', 'status', 'date_of_birth', 'password', 'adult'];
    const queryUpdates = Object.keys(updates).filter(key => allowedFields.includes(key))
                              .map(key => {
                                  params.push(updates[key]);
                                  return `${key} = ?`;
                              }).join(', ');

    if (queryUpdates.length === 0) {
        return res.status(400).json({ message: "Aucune donnée valide pour la mise à jour." });
    }

    const updateQuery = `UPDATE utilisateurs SET ${queryUpdates} WHERE userId = ?`;
    params.push(userId);
    await req.db.query(updateQuery, params);

    const updatedUserResults = await req.db.query('SELECT * FROM utilisateurs WHERE userId = ?', [userId]);
    const updatedUser = updatedUserResults[0];

    if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const newToken = generateToken(updatedUser);
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', token: newToken });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    
    const userExists = await req.db.query('SELECT * FROM utilisateurs WHERE userId = ?', [userId]);

    if (userExists.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    
    await req.db.query('DELETE FROM utilisateurs WHERE userId = ?', [userId]);

    res.status(200).json({ success: true, message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await req.db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    
    const match = await bcrypt.compare(password, user[0].password);

    if (!match) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = generateToken(user[0]);

    res.json({token, user: user[0] });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};



const generateToken = (user) => {

  const payload = {
    userID: user.userID,
    email: user.email,
    status: user.status,
    adulte: user.adult,
    
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};



module.exports = {
  getAllUsers,
  findUserById,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
