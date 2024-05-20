import React, { useEffect, useState } from 'react';
import withAdultVerification from '../hoc/WithAdultVerification';
import { useParams } from 'react-router-dom';
import { productAPI } from '../api/ProductAPI';
import { useCart } from '../context/CartContext';


const ProductDetailRender = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getProductByID(productID)
      .then(response => {
        setProduct(response);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du produit:", error);
      });
  }, [productID]);

  if (!product) {
    return <div>Chargement des détails du produit...</div>;
  }

const parutionDate = new Date(product.parution).toLocaleDateString();

return (
  <section className="container">
    <h2>{product.titre}</h2>
    <h2>{product.sous_titre}</h2>
    <section className="product-container">
      <img src={"https://i.imgur.com/" + product.image.split('/').pop().split('.')[0] + ".jpg"} alt={product.titre} className="product-image"/>
      <div className="product-details">
        <p><strong>Auteur:</strong> {product.auteur}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Info:</strong> {product.info}</p>
        <p><strong>Nombre de pages:</strong> {product.nombre_de_pages}</p>
        <p><strong>Date de parution:</strong> {parutionDate}</p>
        <p><strong>Prix:</strong> {product.price} €</p>
        <p><strong>Référence produit:</strong> {product.product_reference}</p>
        <p><strong>Résumé:</strong> {product.resume}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Référence fournisseur:</strong> {product.supplier_reference}</p>
        <p><strong>Tags:</strong> {product.tags.split(';').join(', ')}</p>
        <button onClick={() => product && addToCart(product)}>Ajouter au panier</button>
      </div>
    </section>
  </section>
);
};

const ProductDetail = withAdultVerification(ProductDetailRender);
export default ProductDetail;
