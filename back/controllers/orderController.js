const mysql = require('promise-mysql');


const getAllOrders = async (req, res) => {
  try {
    const orders = await req.db.query('SELECT * FROM Commandes');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

const getUserOrders = async (req, res) => {
  try {
      const userID = req.params.userID; 
      const orders = await req.db.query('SELECT * FROM Commandes WHERE userID = ?', [userID]);
      res.json(orders);
  } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await req.db.query('SELECT * FROM Commandes WHERE orderID = ?', [orderId]);

    if (order.length === 0) {
      res.status(404).json({ error: 'Commande non trouvée' });
    } else {
      res.status(200).json(order[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
};

const createOrder = async (req, res) => {
  try {
    
    const { userID, delivery_address, order_status, phone, email, name_surname, order_date, order_price } = req.body;

    
    const result = await req.db.query('INSERT INTO Commandes (userID, delivery_address, order_status, phone, email, name_surname, order_date, order_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [userID, delivery_address, order_status, phone, email, name_surname, order_date, order_price]);

    
    res.status(201).json({ message: 'Commande ajoutée avec succès', orderID: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la commande' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;

    let query = 'UPDATE Commandes SET ';
    let queryParams = [];
    Object.keys(updates).forEach((key, index) => {
      query += `${key} = ?`;
      queryParams.push(updates[key]);
      if (index < Object.keys(updates).length - 1) query += ', ';
    });
    query += ' WHERE orderID = ?';
    queryParams.push(orderId);

    await req.db.query(query, queryParams);

    res.status(200).json({ message: 'Commande mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
  }
};


const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    
    const orderExists = await req.db.query('SELECT * FROM Commandes WHERE orderID = ?', [orderId]);

    if (orderExists.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    
    await req.db.query('DELETE FROM Commandes WHERE orderID = ?', [orderId]);

    res.status(200).json({ success: true, message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
  }
};

const getOrdersWithParams = async (req, res) => {
  try {
      
      const { userID, orderID, order_status, email, sortByDate } = req.query;

      
      let query = "SELECT * FROM Commandes WHERE 1 = 1"; 
      let queryParams = [];

      if (userID) {
          query += " AND userID = ?";
          queryParams.push(userID);
      }
      if (orderID) {
          query += " AND orderID = ?";
          queryParams.push(orderID);
      }
      if (order_status) {
          query += " AND order_status = ?";
          queryParams.push(order_status);
      }
      if (email) {
          query += " AND email = ?";
          queryParams.push(email);
      }
      if (sortByDate) {
          query += " ORDER BY order_date DESC";
      }

      const orders = await req.db.query(query, queryParams);
      res.json(orders);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes avec paramètres:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getOrdersWithParams,
};
