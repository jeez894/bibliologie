const axios = require('axios');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPaymentIntent = async (req, res) => {
    try {
        const { amount, customerInfo } = req.body; 
  
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur', 
        });
    
        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

  
  
  module.exports = {
    createPaymentIntent,
  };