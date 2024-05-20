import React from 'react';
import withAdultVerification from '../hoc/WithAdultVerification';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPageRender = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const shippingCost = 5;
  const handleRemoveFromCart = (productID) => {
    removeFromCart(productID);
  };

  const handleQuantityChange = (productID, change) => {
    const product = cart.find(item => item.productID === productID);
    if (product) {
      const newQuantity = Math.max(product.quantity + change, 0);
      updateQuantity(productID, newQuantity);
    }
  };

  const subTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0) + shippingCost;

  if (cart.length === 0) {
    return <div className="container">Votre panier est vide.</div>;
  }

  return (
  <section className="container">
    <h2>Votre Panier</h2>
    {cart.length === 0 ? (
      <p>Votre panier est vide.</p>
    ) : (
      <>
        {cart.map((item) => (
          <article key={item.productID} className="cart-item">
            <img src={`https://i.imgur.com/${item.image.split('/').pop().split('.')[0]}.jpg`} alt={item.titre} className="cart-item-image" />
            <section className="cart-item-info">
              <h3>{item.titre}</h3>
              <p>Quantité: {item.quantity}</p>
              <p>Prix unitaire: {item.price}€</p>
            </section>
            <section className="cart-item-actions">
              <button onClick={() => handleQuantityChange(item.productID, 1)}>+</button>
              <button onClick={() => handleQuantityChange(item.productID, -1)}>-</button>
              <button onClick={() => handleRemoveFromCart(item.productID)}>Supprimer</button>
            </section>
            <hr />
          </article>
        ))}
        <section className="cart-summary">
          <p>Total: {subTotal.toFixed(2)} €</p>
          <p>Frais de port : {shippingCost.toFixed(2)} €</p>
          <p>Total (avec frais de port) : {totalPrice.toFixed(2)} €</p>
          <Link to="/checkout" state={{ totalPrice }} className="link-to-checkout">
            Passer la commande
          </Link>
        </section>
      </>
    )}
  </section>
  );
  
};
const CartPage = withAdultVerification(CartPageRender);
export default CartPage;
