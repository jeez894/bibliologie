import React, { useState } from 'react';
import { searchOrders, updateOrderStatus, fetchOrderDetails } from '../../api/OrderAPI'; 
import OrderDetailsModal from '../modal/OrderDetailsModal';
import { useCsrfToken } from '../../helpers/UseCsrfToken';


const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [searchParams, setSearchParams] = useState({
        userID: '',
        orderID: '',
        order_status: '',
        email: '',
        sortByDate: false
    });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const csrfToken = useCsrfToken();


    const fetchOrders = (params = {}) => {
        setLoading(true);
        searchOrders(params) 
            .then(response => {
                setOrders(response || []); 
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Erreur lors de recuperation des commandes:', error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchPerformed(true);
        fetchOrders(searchParams);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleUpdateStatus = (orderID, newStatus) => {
        const updateData = { order_status: newStatus }; // Préparation des données de mise à jour
        updateOrderStatus(orderID, updateData, csrfToken) // Passer le CSRF token correctement
          .then(() => {
            fetchOrders(searchParams); // Rafraîchir les données après la mise à jour
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour du statut de la commande:', error);
          });
      };
      

    const handleViewDetails = (orderID) => {
        
        fetchOrderDetails(orderID)
            .then(details => {
                setSelectedOrderDetails(details);
                setIsModalOpen(true);
            })
            .catch(error => console.error("Erreur lors de la récupération des détails de commande :", error));
    };
      

    return (
        <>
            <h2>Gestion des commandes</h2>
            <form onSubmit={handleSearch}>
                <label htmlFor="userID" className="visually-hidden">ID Utilisateur</label>
                <input 
                    type="text" 
                    name="userID" 
                    id="userID"
                    placeholder="ID Utilisateur" 
                    value={searchParams.userID} 
                    onChange={handleChange} 
                />

                <label htmlFor="orderID" className="visually-hidden">ID Commande</label>
                <input 
                    type="text" 
                    name="orderID" 
                    id="orderID"
                    placeholder="ID Commande" 
                    value={searchParams.orderID} 
                    onChange={handleChange} 
                />

                <label htmlFor="order_status" className="visually-hidden">Status</label>
                <input 
                    type="text" 
                    name="order_status" 
                    id="order_status"
                    placeholder="Status" 
                    value={searchParams.order_status} 
                    onChange={handleChange} 
                />

                <label htmlFor="email" className="visually-hidden">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    placeholder="Email" 
                    value={searchParams.email} 
                    onChange={handleChange} 
                />

                <label htmlFor="sortByDate">Trier par date</label>
                <input 
                    type="checkbox" 
                    name="sortByDate" 
                    id="sortByDate"
                    checked={searchParams.sortByDate} 
                    onChange={e => setSearchParams({...searchParams, sortByDate: e.target.checked})} 
                />
                
                <button type="submit">Rechercher</button>
            </form>

            {loading ? <p>Chargement...</p> : searchPerformed && (
                <table>
                    <thead>
                        <tr>
                            <th>ID Commande</th>
                            <th>ID Utilisateur</th>
                            <th>Email</th>
                            <th>Statut</th>
                            <th>Date</th>
                            <th>Nom et Prénom</th>
                            <th>Adresse de livraison</th>
                            <th>Téléphone</th>
                            <th>Détails</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderID}>
                                <td data-label="ID Commande">{order.orderID}</td>
                                <td data-label="ID Utilisateur">{order.userID}</td>
                                <td data-label="Email">{order.email}</td>
                                <td data-label="Statut">
                                    {order.order_status}
                                    <button onClick={() => handleUpdateStatus(order.orderID, 'Payé', csrfToken)}>Payé</button>
                                    <button onClick={() => handleUpdateStatus(order.orderID, 'Envoyé', csrfToken)}>Envoyé</button>
                                    <button onClick={() => handleUpdateStatus(order.orderID, 'Complété', csrfToken)}>Complété</button>
                                </td>
                                <td data-label="Date">{new Date(order.order_date).toLocaleDateString()}</td>
                                <td data-label="Nom et Prénom">{order.name_surname}</td>
                                <td data-label="Adresse de livraison">{order.delivery_address}</td>
                                <td data-label="Téléphone">{order.phone}</td>
                                <td data-label="Détails">
                                    <button onClick={() => handleViewDetails(order.orderID)}>Détails</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && searchPerformed && orders.length === 0 && <p>Aucun résultat trouvé.</p>}
            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                orderDetails={selectedOrderDetails}
            />
        </>
    );
};

export default OrderManagement;
