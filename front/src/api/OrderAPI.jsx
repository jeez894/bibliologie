import axios from "../axiosConfig";  // Assurez-vous que cette configuration d'axios inclut les paramètres de base requis.

export const createOrder = async (orderData, csrfToken) => {
  console.log("Entrée dans createOrder avec:", orderData);
  return axios.post('/createOrder', orderData, {
    headers: {
      "X-CSRF-Token": csrfToken
    },
    withCredentials: true
  }).then(response => {
    console.log("createOrder success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("createOrder error:", error);
    throw error;
  });
};

export const createOrderDetail = async (detailData, csrfToken) => {
  console.log("Entrée dans createOrderDetail avec:", detailData);
  return axios.post('/createOrderDetail', detailData, {
    headers: {
      "X-CSRF-Token": csrfToken
    },
    withCredentials: true
  }).then(response => {
    console.log("createOrderDetail success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("createOrderDetail error:", error);
    throw error;
  });
};

export const fetchUserOrders = async (userID) => {
  console.log("Entrée dans fetchUserOrders avec userID:", userID);
  return axios.get(`/user/orders/${userID}`).then(response => {
    console.log("fetchUserOrders success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("fetchUserOrders error:", error);
    throw error;
  });
};

export const fetchOrderDetails = async (orderID) => {
  console.log("Entrée dans fetchOrderDetails avec orderID:", orderID);
  return axios.get(`/orderDetails/${orderID}`).then(response => {
    console.log("fetchOrderDetails success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("fetchOrderDetails error:", error);
    throw error;
  });
};

export const searchOrders = async (params = {}) => {
  console.log("Entrée dans searchOrders avec params:", params);
  const queryParams = new URLSearchParams(params).toString();
  return axios.get(`/orderSearch?${queryParams}`).then(response => {
    console.log("searchOrders success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("searchOrders error:", error);
    throw error;
  });
};

export const updateOrderStatus = async (orderID, data, csrfToken) => {
  console.log("Entrée dans updateOrderStatus avec orderID:", orderID, "data:", data);
  return axios.patch(`/order/${orderID}`, data, {
    headers: {
      "X-CSRF-Token": csrfToken
    },
    withCredentials: true
  }).then(response => {
    console.log("updateOrderStatus success:", response.data);
    return response.data;
  }).catch(error => {
    console.error("updateOrderStatus error:", error);
    throw error;
  });
};
