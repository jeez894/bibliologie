
import axios from 'axios';
import config from "../../config"



export const fetchPaymentIntentClientSecret = async (totalPrice, customerInfo) => {
  try {
    const response = await axios.post(`${config.backend}/create-payment-intent`, {
      amount:totalPrice,
      customerInfo
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error('Erreur lors de la récupération du clientSecret:', error);
    throw error;
  }
};