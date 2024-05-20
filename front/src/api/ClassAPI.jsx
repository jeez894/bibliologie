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

export const classAPI = {
    getAllClasses: async () => {
        return axiosInstance.get('/classes').then(response => response.data);
    },
    getClassById: async (id) => {
        return axiosInstance.get(`/classes/${id}`).then(response => response.data);
    },
    createClass: async (data, csrfToken) => {
        return axiosInstance.post('/classes', data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    updateClass: async (id, data, csrfToken) => {
        return axiosInstance.put(`/classes/${id}`, data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    deleteClass: async (id, csrfToken) => {
        return axiosInstance.delete(`/classes/${id}`, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    getClassesByUserId: async (userId) => {
        return axiosInstance.get(`/classes/user/${userId}`).then(response => response.data);
    }
};
