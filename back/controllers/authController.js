const jwt = require('jsonwebtoken');
const { findUserById } = require('./userController');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).send({ message: 'Token manquant ou invalide.' });
    }
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.userID, req.db);
    if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé.' });
    } else {
        res.json({ valid: true, ...user });
    }
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token invalide.' });
  }
};

module.exports = { verifyToken };
