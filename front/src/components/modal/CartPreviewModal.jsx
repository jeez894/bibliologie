
import React from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext'; 

const CartPreviewModal = ({ show }) => {
  const { cart } = useCart(); 

  if (!show) {
    return null; 
  }

  return (
    <div className="menu header-modal">
      {cart.length > 0 ? (
        <ul>
          {cart.map(item => (
            <li key={item.productID}>
              {item.titre} - Quantité : {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Votre panier est vide.</p>
      )}
      <Link to="/cart">Voir le panier</Link>
    </div>
  );
};

export default CartPreviewModal;
