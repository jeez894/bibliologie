import React, { useEffect, useState } from 'react';
import { productAPI } from '../api/ProductAPI';
import { useNavigate } from 'react-router-dom';
import GenericCarousel from './GenericCarousel';

const RandomProductsHome = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getAllProducts()
      .then(response => {
        const shuffled = response.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 5));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits aléatoires:", error);
      });
  }, []);

  const handleProductClick = (productID) => {
    navigate(`/product/${productID}`);
  };

  const handleViewAll = () => {
    navigate('/shop/all');
  };

  const renderProductItem = (product) => (
    <div>
      <img src={`https://i.imgur.com/${product.image.split('/').pop().split('.')[0]}.jpg`} alt={product.titre} />
      <h3>{product.titre}</h3>
    </div>
  );

  return (
    <>
      <h2>Tous les produits</h2>
      <button onClick={handleViewAll}>Voir tous les produits</button>
      {randomProducts.length > 0 && (
        <GenericCarousel 
          items={randomProducts} 
          onItemClick={(product) => handleProductClick(product.productID)} 
          renderItem={renderProductItem} 
        />
      )}
    </>
  );
};

export default RandomProductsHome;
