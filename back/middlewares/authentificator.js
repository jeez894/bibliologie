const jwt = require('jsonwebtoken');


const authentificateAdmin = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré." });
    }
    if (decoded.status !== 'admin' && decoded.status !== 'superAdmin') {
      return res.status(403).json({ error: "Accès refusé. Requiert des droits administrateur." });
    }

    req.user = decoded;

    next();
  });
};


const authentificateAdult = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token invalide ou expiré." });
    }
    if (decoded.adulte !== 1) {
      return res.status(403).json({ error: "Contenu accessible uniquement aux adultes." });
    }

    req.user = decoded;
    next();
  });
};


const getTokenFromHeader = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

module.exports = { authentificateAdmin, authentificateAdult };