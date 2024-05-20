import React, { useEffect, useState } from 'react';
import { productAPI } from '../../api/ProductAPI';

const OrderDetailsModal = ({ isOpen, onClose, orderDetails }) => {
    const [detailedOrderDetails, setDetailedOrderDetails] = useState([]);

    useEffect(() => {
        if(orderDetails && isOpen) {
            const detailsPromises = orderDetails.map(detail => 
                productAPI.getProductByID(detail.productID).then(response => {
                    const productInfo = response;
                    return {
                        ...detail,
                        productName: productInfo.titre,
                        productImage: productInfo.image,
                        unitPrice: productInfo.price
                    };
                })
            );

            Promise.all(detailsPromises).then(setDetailedOrderDetails);
        }
    }, [orderDetails, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose}>Fermer</button>
                <h3>Détails de la commande #{orderDetails[0]?.orderID}</h3>
                {detailedOrderDetails.length > 0 ? (
                    <ul>
                        {detailedOrderDetails.map((detail, index) => (
                            <li key={index}>
                                <img src={"https://i.imgur.com/" + detail.productImage.split('/').pop().split('.')[0] + ".jpg"} alt={detail.productName} style={{ width: "100px" }} />
                                <p>{detail.productName} - Quantité: {detail.quantity}, Prix unitaire: {detail.unitPrice}€</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun détail de commande disponible.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsModal;
