const jwt = require('jsonwebtoken');

const verifyAdult = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.adulte === 1) {
            req.isAdultVerified = true; 

            next(); 
        } else {
          req.isAdultVerified = false; 

            return res.status(403).json({ message: 'Contenu réservé aux adultes' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
};



module.exports = { verifyAdult };
