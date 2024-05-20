import React, { useEffect, useState } from 'react';
import withAdultVerification from '../hoc/WithAdultVerification';
import { productAPI } from '../api/ProductAPI';
import { useNavigate } from 'react-router-dom';
import Banner from "../../public/asset/logo/cover.jpg";


const AllProductsPageRender = () => {
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getAllProducts()
      .then(response => {
        const products = response;
        setAllProducts(products);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits:", error);
      });
  }, []);
  

  const handleViewAllLatest = () => {
    navigate('/shop/home');
  };

  const handleProductClick = (productID) => {
    navigate(`/product/${productID}`);
  };

  return (
    <div className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
      <figure className="homepage-banner">
        <img src={Banner} alt="Bannière" />
      </figure>
      <div className="container">
        <h2>Tout les produits</h2>
        <button onClick={handleViewAllLatest}>retour</button>
        <section className="container search-results-container">
          {allProducts.map(product => (
            <article key={product.productID} className="search-result-item" onClick={() => handleProductClick(product.productID)}>
              <img src={"https://i.imgur.com/" + product.image.split('/').pop().split('.')[0] + ".jpg"} alt={product.titre} className="product-image" />
              <h3>{product.titre}</h3>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

const AllProductsPage = withAdultVerification(AllProductsPageRender);
export default AllProductsPage;

