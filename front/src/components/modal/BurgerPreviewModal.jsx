import React from 'react';

const BurgerModal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
  <div className="burger-overlay" onClick={onClose} role="presentation">
    <div
      className="menu burger-modal"
      onClick={e => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu burger"
    >
      {children}
    </div>
  </div>
  );
};

export default BurgerModal;
