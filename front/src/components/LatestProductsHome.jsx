import React, { useEffect, useState } from 'react';
import { productAPI } from '../api/ProductAPI';
import { useNavigate } from 'react-router-dom';
import GenericCarousel from './GenericCarousel';

const LatestProductsHome = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getLatestProducts()
      .then(products => {
        setLatestProducts(products.slice(0, 5)); 
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des derniers produits:", error);
      });
  }, []);

  const handleViewAllLatest = () => {
    navigate('/shop/latest');
  };

  const handleProductClick = (productID) => {
    navigate(`/product/${productID}`);
  };

  const renderProductItem = (product) => (
    <div>
      <img src={`https://i.imgur.com/${product.image.split('/').pop().split('.')[0]}.jpg`} alt={product.titre} />
      <h3>{product.titre}</h3>
    </div>
  );

  return (
    <>
      <h2>Dernières Parutions</h2>
      <button onClick={handleViewAllLatest}>Voir toutes les dernières parutions</button>
      {latestProducts.length > 0 && (
        <GenericCarousel 
          items={latestProducts} 
          onItemClick={(product) => handleProductClick(product.productID)} 
          renderItem={renderProductItem} 
        />
      )}
    </>
  );
};

export default LatestProductsHome;