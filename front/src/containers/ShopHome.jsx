// ShopHome.jsx
import React from 'react';
import withAdultVerification from '../hoc/WithAdultVerification';
import LatestProductsHome from '../components/LatestProductsHome';
import RandomProductsHome from '../components/RandomProductsHome';
import Banner from "../../public/asset/logo/cover.jpg";

const ShopHomeRender = () => (
  <section className='homepage' style={{ '--banner-image': `url(${Banner})` }}>
    <figure className="homepage-banner">
      <img src={Banner} alt="Bannière" />
    </figure>
    <div className="container">
      <h2>Bienvenue dans notre Boutique</h2>
      <section>
        <LatestProductsHome />
        <RandomProductsHome />
      </section>
    </div>
  </section>
);

const ShopHome = withAdultVerification(ShopHomeRender);
export default ShopHome;
