
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });
  const [showPopup, setShowPopup] = useState(false); 


  const addToCart = (product) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex(item => item.productID === product.productID);
      if (index >= 0) {
        updatedCart[index].quantity += 1; 
      } else {
        updatedCart.push({ ...product, quantity: 1, unitPrice: product.unitPrice });
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setShowPopup(true); 
      return updatedCart;
    });
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const removeFromCart = (productID) => {
    setCart(currentCart => {
      const newCart = currentCart.filter(item => item.productID !== productID);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productID, newQuantity) => {
    setCart(currentCart => {
      return currentCart.map(item => {
        if (item.productID === productID) {
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; 
        }
        return item;
      });
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
      {showPopup && <div className="popup">Produit ajouté au panier !</div>}
    </CartContext.Provider>
  );
};
