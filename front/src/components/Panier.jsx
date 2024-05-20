import React from 'react';

const Panier = ({ panier, retirerDuPanier }) => {
  return (
    <>
      <h2>Votre Panier</h2>
      <ul>
        {panier.map((item, index) => (
          <li key={index}>
            {item.titre} - {item.prix}€
            <button onClick={() => retirerDuPanier(index)}>Retirer</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Panier;
