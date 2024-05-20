

const mysql = require('promise-mysql');


const getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await req.db.query('SELECT * FROM detailscommande');
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de commande :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des détails de commande' });
  }
};

const getOrderDetailById = async (req, res) => {
  const orderDetailId = req.params.id;

  try {
    const orderDetail = await req.db.query('SELECT * FROM detailscommande WHERE order_DetailID = ?', [orderDetailId]);

    if (orderDetail.length === 0) {
      res.status(404).json({ error: 'Détail de commande non trouvé' });
    } else {
      res.status(200).json(orderDetail[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du détail de commande :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du détail de commande' });
  }
};

const getOrderDetailByOrderId = async (req, res) => {
  const orderID = req.params.orderID;

  try {
    const orderDetail = await req.db.query('SELECT * FROM detailscommande WHERE orderID = ?', [orderID]);

    if (orderDetail.length === 0) {
      res.status(404).json({ error: 'Détail de commande non trouvé' });
    } else {
      res.status(200).json(orderDetail);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du détail de commande :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du détail de commande' });
  }
};


const createOrderDetail = async (req, res) => {
  try {
    
    const { orderID, productID, quantity, unitPrice, total } = req.body;

    
    const result = await req.db.query('INSERT INTO detailscommande (orderID, productID, quantity, unitPrice, total) VALUES (?, ?, ?, ?, ?)', [orderID, productID, quantity, unitPrice, total]);

    
    res.status(201).json({ message: 'Détail de commande ajouté avec succès', orderDetailId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du détail de commande :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du détail de commande' });
  }
};


const updateOrderDetail = async (req, res) => {
  try {
    
    const orderDetailId = req.params.id;

    
    const { orderID, productID, quantity, unitPrice, total } = req.body;

    
    await req.db.query('UPDATE detailscommande SET orderID = ?, productID = ?, quantity = ?, unitPrice = ?, total = ? WHERE order_DetailID = ?', [orderID, productID, quantity, unitPrice, total, orderDetailId]);

    
    res.status(200).json({ message: 'Détail de commande mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du détail de commande :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du détail de commande' });
  }
};


const deleteOrderDetail = async (req, res) => {
  const orderDetailId = req.params.id;

  try {
    
    const orderDetailExists = await req.db.query('SELECT * FROM detailscommande WHERE order_DetailID = ?', [orderDetailId]);

    if (orderDetailExists.length === 0) {
      return res.status(404).json({ error: 'Détail de commande non trouvé' });
    }

    
    await req.db.query('DELETE FROM detailscommande WHERE order_DetailID = ?', [orderDetailId]);

    res.status(200).json({ success: true, message: 'Détail de commande supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du détail de commande :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du détail de commande' });
  }
};

module.exports = {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  getOrderDetailByOrderId,
};
