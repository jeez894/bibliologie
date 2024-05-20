import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { fetchPaymentIntentClientSecret } from '../api/StripeAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, createOrderDetail } from '../api/OrderAPI';
import { jwtDecode } from "jwt-decode";
import { useCart } from '../context/CartContext';
import { useCsrfToken } from '../helpers/UseCsrfToken';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const { totalPrice } = location.state || { totalPrice: 0 };
    const { cart, clearCart} = useCart();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = window.localStorage.getItem('b4y-token');
    const decodedToken = jwtDecode(token);
    const csrfToken = useCsrfToken();
    const userID = decodedToken.userID;


    const [amount, setAmount] = useState(totalPrice.toFixed(2)*100); 
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        addressLine1: '',
        city: '',
        postalCode: '',
        country: '',
    });

    useEffect(() => {
        fetchPaymentIntentClientSecret(amount, customerInfo, csrfToken)
            .then(setClientSecret)
            .catch((error) => console.error('Erreur lors de la préparation du paiement', error));
        }, [amount, customerInfo, csrfToken]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            console.log('Stripe.js n\'a pas encore chargé.');
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                    phone: customerInfo.phone,
                    address: {
                        line1: customerInfo.addressLine1,
                        city: customerInfo.city,
                        postal_code: customerInfo.postalCode,
                        country: customerInfo.country,
                    },
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            alert('Paiement réussi !');
    
            const orderData = {
                userID: userID,
                delivery_address: customerInfo.addressLine1 + ', ' + customerInfo.city + ', ' + customerInfo.postalCode + ', ' + customerInfo.country,
                order_status: "Payé",
                phone: "test",
                email: customerInfo.email,
                name_surname: customerInfo.name,
                order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                order_price: totalPrice,
            };


            createOrder(orderData, csrfToken)
            .then(data => {
                const orderID = data.orderID; 

                const detailsPromises = cart.map((item) => {
                    const detailData = {
                        orderID: orderID,
                        productID: item.productID,
                        quantity: item.quantity,
                        unitPrice: item.price,
                        total: item.quantity * item.price,
                    };

                    return createOrderDetail(detailData, csrfToken);
                });

                return Promise.all(detailsPromises);
            })
            .then(details => {
                clearCart();
                navigate('/success');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la commande ou des détails de commande:', error);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="checkout-form">
                <CardElement />
                <input type="hidden" name="_csrf" value={csrfToken}/>
                
                <label htmlFor="name" className="visually-hidden">Nom complet</label>
                <input id="name" type="text" name="name" placeholder="Nom complet" onChange={handleChange} required />
                
                <label htmlFor="email" className="visually-hidden">Email</label>
                <input id="email" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                
                <label htmlFor="addressLine1" className="visually-hidden">Adresse</label>
                <input id="addressLine1" type="text" name="addressLine1" placeholder="Adresse" onChange={handleChange} required />
                
                <label htmlFor="city" className="visually-hidden">Ville</label>
                <input id="city" type="text" name="city" placeholder="Ville" onChange={handleChange} required />
                
                <label htmlFor="postalCode" className="visually-hidden">Code Postal</label>
                <input id="postalCode" type="text" name="postalCode" placeholder="Code Postal" onChange={handleChange} required />
                
                <label htmlFor="country" className="visually-hidden">Pays</label>
                <input id="country" type="text" name="country" placeholder="Pays" onChange={handleChange} required />
                
                <button type="submit" disabled={!clientSecret || loading}>Payer</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );    
};

export default CheckoutForm;