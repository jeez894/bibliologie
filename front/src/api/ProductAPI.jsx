import axios from "axios";
import config from "../../config";

const axiosInstance = axios.create({
    baseURL: config.backend,
    withCredentials: true
});

// Fonction pour récupérer dynamiquement le token d'authentification stocké localement
const getAuthToken = () => window.localStorage.getItem("b4y-token");

// Ajout dynamique du token d'authentification Bearer dans les en-têtes par défaut de l'instance axios
axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const productAPI = {
  getAllProducts: async () => {
    return axiosInstance.get('/getAllProduct').then(response => response.data);
  },

  getProductByID: async (ID) => {
    return axiosInstance.get(`/product/search/ID/${ID}`).then(response => response.data);
  },

  searchProducts: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return axiosInstance.get(`/searchProduct?${queryParams}`).then(response => response.data);
  },

  createProduct: async (data, csrfToken) => {
    return axiosInstance.post('/createProduct', data, {
      headers: {
        'x-csrf-token': csrfToken
      }
    }).then(response => response.data);
  },

  updateProduct: async (ID, data, csrfToken) => {
    return axiosInstance.patch(`/updateProduct/${ID}`, data, {
      headers: {
        'x-csrf-token': csrfToken
      }
    }).then(response => response.data);
  },

  deleteProduct: async (ID, csrfToken) => {
    return axiosInstance.delete(`/deleteProduct/${ID}`, {
      headers: {
        'x-csrf-token': csrfToken
      }
    }).then(response => response.data);
  },

  getProductByTitle: async (title) => {
    return axiosInstance.get(`/product/search/title/${title}`).then(response => response.data);
  },

  getProductByAuthor: async (author) => {
    return axiosInstance.get(`/product/search/author/${author}`).then(response => response.data);
  },

  getProductByTags: async (tag) => {
    return axiosInstance.get(`/product/search/tags/${tag}`).then(response => response.data);
  },

  getProductByParutionDate: async (parutionDate) => {
    return axiosInstance.get(`/product/search/parution/${parutionDate}`).then(response => response.data);
  },

  getLatestProducts: async () => {
    return axiosInstance.get('/products/latest').then(response => response.data);
  },
};
