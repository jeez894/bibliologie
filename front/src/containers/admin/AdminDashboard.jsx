
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/UserSlice';

import MemberManagement from '../../components/gestion/MemberManagement';
import ProductManagement from '../../components/gestion/ProductManagement';
import OrderManagement from '../../components/gestion/OrderManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('');
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const renderActiveTab = () => {
        switch (activeTab) {
          case 'members':
            return <MemberManagement />;
          case 'products':
            return <ProductManagement />;
          case 'orders':
            return <OrderManagement />;
          default:
            return <div>Bienvenus au panneau de gestion</div>;
        }
      };

    useEffect(() => {
      // Vérifie si l'utilisateur est connecté et a les droits d'admin ou de super admin
      if (!user.isLogged || (user.infos.status !== 'admin' && user.infos.status !== 'superAdmin')) {
          navigate('/'); // Redirige vers la page d'accueil si non autorisé
      }
    }, [user, navigate]);

    return (
        <div className="container">
          <h2>Dashboard Administration</h2>
          <nav>
            <button onClick={() => setActiveTab('members')}>Gestion Membres</button>
            <button onClick={() => setActiveTab('products')}>Gestion Produits</button>
            <button onClick={() => setActiveTab('orders')}>Gestion Commandes</button>
          </nav>
          {renderActiveTab()}
        </div>
      );
};

export default AdminDashboard;
