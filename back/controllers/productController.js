

const mysql = require('promise-mysql');


const getAllProducts = async (req, res) => {
  try {
    const products = await req.db.query('SELECT * FROM Produits');
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await req.db.query('SELECT * FROM Produits WHERE productID = ?', [productId]);

    if (product.length === 0) {
      res.status(404).json({ error: 'Produit non trouvé' });
    } else {
      res.status(200).json(product[0]);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
};


const createProduct = async (req, res) => {

  try {
    
    const {
      description,
      info,
      product_reference,
      supplier_reference,
      stock,
      price,
      image,
      titre,
      sous_titre,
      resume,
      auteur,
      tags,
      nombre_de_pages, 
      parution
    } = req.body;

    
    const result = await req.db.query('INSERT INTO Produits (description, info, product_reference, supplier_reference, stock, price, image, titre, sous_titre, resume, auteur, tags, nombre_de_pages, parution) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [description, info, product_reference, supplier_reference, stock, price, image, titre, sous_titre, resume, auteur, tags, nombre_de_pages, parution]);

    
    res.status(201).json({ message: 'Produit ajouté avec succès', productId: result.insertId });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
  }
};



const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    let query = 'UPDATE Produits SET ';
    let queryParams = [];
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        query += `${key} = ?,`;
        queryParams.push(value);
      }
    });
    query = query.slice(0, -1); 
    query += ` WHERE productID = ?`;
    queryParams.push(productId);

    await req.db.query(query, queryParams);

    res.status(200).json({ message: 'Produit mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
};


const getProductByTitle = async (req, res) => {
  const title = req.params.title; 

  try {
    const products = await req.db.query('SELECT * FROM Produits WHERE titre LIKE ?', [`%${title}%`]);

    if (products.length === 0) {
      res.status(404).json({ error: 'Aucun produit trouvé avec ce titre' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche par titre :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche par titre' });
  }
};

const getProductByAuthor = async (req, res) => {
  const author = req.params.author; 

  try {
    const products = await req.db.query('SELECT * FROM Produits WHERE auteur = ?', [author]);

    if (products.length === 0) {
      res.status(404).json({ error: 'Aucun produit trouvé pour cet auteur' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche par auteur :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche par auteur' });
  }
};

const getProductByTags = async (req, res) => {
  const tag = req.params.tag; 

  try {
    const products = await req.db.query('SELECT * FROM Produits WHERE tags LIKE ?', [`%${tag}%`]);

    if (products.length === 0) {
      res.status(404).json({ error: 'Aucun produit trouvé avec ce tag' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche par tags :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche par tags' });
  }
};

const getProductByParutionDate = async (req, res) => {
  const parutionDate = req.params.parutionDate; 

  try {
    const products = await req.db.query('SELECT * FROM Produits WHERE parution = ?', [parutionDate]);

    if (products.length === 0) {
      res.status(404).json({ error: 'Aucun produit trouvé avec cette date de parution' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche par date de parution :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche par date de parution' });
  }
};

const getLatestProducts = async (req, res) => {
  try {
    const products = await req.db.query('SELECT * FROM Produits ORDER BY parution DESC');

    if (products.length === 0) {
      res.status(404).json({ error: 'Aucun produit trouvé' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des derniers produits :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des derniers produits' });
  }
};



const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    
    const productExists = await req.db.query('SELECT * FROM Produits WHERE productID = ?', [productId]);

    if (productExists.length === 0) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    
    await req.db.query('DELETE FROM Produits WHERE productID = ?', [productId]);

    res.status(200).json({ success: true, message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
};

const searchProducts = async (req, res) => {
  const {
    productID,
    description,
    info,
    product_reference,
    supplier_reference,
    stock,
    price,
    image,
    titre,
    sous_titre,
    resume,
    auteur,
    tags,
    nombre_de_pages, 
    parution
  } = req.query;
  
  let query = 'SELECT * FROM Produits WHERE 1=1';
  const queryParams = [];

  if (productID) {
    query += ' AND productID = ?';
    queryParams.push(productID);
  }
  if (description) {
    query += ' AND description LIKE ?';
    queryParams.push(`%${description}%`);
  }
  if (info) {
    query += ' AND info LIKE ?';
    queryParams.push(`%${info}%`);
  }
  if (product_reference) {
    query += ' AND product_reference = ?';
    queryParams.push(product_reference);
  }
  if (supplier_reference) {
    query += ' AND supplier_reference = ?';
    queryParams.push(supplier_reference);
  }
  if (stock) {
    query += ' AND stock = ?';
    queryParams.push(stock);
  }
  if (price) {
    query += ' AND price = ?';
    queryParams.push(price);
  }
  if (image) {
    query += ' AND image = ?';
    queryParams.push(image);
  }
  if (titre) {
    query += ' AND titre LIKE ?';
    queryParams.push(`%${titre}%`);
  }
  if (sous_titre) {
    query += ' AND sous_titre LIKE ?';
    queryParams.push(`%${sous_titre}%`);
  }
  if (resume) {
    query += ' AND resume LIKE ?';
    queryParams.push(`%${resume}%`);
  }
  if (auteur) {
    query += ' AND auteur = ?';
    queryParams.push(auteur);
  }
  if (tags) {
    query += ' AND tags LIKE ?';
    queryParams.push(`%${tags}%`);
  }
  if (nombre_de_pages) {
    query += ' AND nombre_de_pages = ?';
    queryParams.push(nombre_de_pages);
  }
  if (parution) {
    query += ' AND parution = ?';
    queryParams.push(parution);
  }

  try {
    const products = await req.db.query(query, queryParams);
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la recherche de produits:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductByTitle,
  getProductByAuthor,
  getProductByTags,
  getProductByParutionDate,
  getLatestProducts,
  deleteProduct,
  searchProducts,
};
