import axios from "axios";
import config from "../../config";

// Création d'une instance axios configurée pour gérer les requêtes avec les cookies et les en-têtes d'authentification
const axiosInstance = axios.create({
    baseURL: config.backend,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Fonction pour récupérer dynamiquement le token d'authentification stocké localement
const getAuthToken = () => window.localStorage.getItem("b4y-token");

// Ajout dynamique du token d'authentification Bearer dans les en-têtes par défaut de l'instance axios
axiosInstance.interceptors.request.use(config => {
    const token = getAuthToken();
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
}, error => Promise.reject(error));

export const itemAPI = {
    getAllItems: async () => {
        return axiosInstance.get('/item').then(response => response.data);
    },
    getItemById: async (id) => {
        return axiosInstance.get(`/item/${id}`).then(response => response.data);
    },
    createItem: async (data, csrfToken) => {
        return axiosInstance.post('/item', data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    updateItem: async (id, data, csrfToken) => {
        return axiosInstance.put(`/item/${id}`, data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    deleteItem: async (id, csrfToken) => {
        return axiosInstance.delete(`/item/${id}`, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    getItemByVolumeId: async (volumeId) => {
        return axiosInstance.get(`/item/volume/${volumeId}`).then(response => response.data);
    },
    getItemByClass: async (userId, classId) => {
        return axiosInstance.get(`/bibliotheque/${userId}/${classId}`).then(response => response.data);
    }
};
