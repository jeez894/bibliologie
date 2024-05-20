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

export const libraryAPI = {
    getAllLibraries: async () => {
        return axiosInstance.get('/libraries').then(response => response.data);
    },
    getLibraryById: async (id) => {
        return axiosInstance.get(`/libraries/${id}`).then(response => response.data);
    },
    createLibraryEntry: async (data, csrfToken) => {
        return axiosInstance.post('/libraries', data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    updateLibrary: async (id, data, csrfToken) => {
        return axiosInstance.put(`/libraries/${id}`, data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    deleteLibrary: async (id, csrfToken) => {
        return axiosInstance.delete(`/libraries/${id}`, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    updateStatusLibrary: async (userId, classId, itemID, data, csrfToken) => {
        return axiosInstance.put(`/libraries/${userId}/${classId}/${itemID}`, data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    updateLibraryLibrary: async (userId, classId, itemID, data, csrfToken) => {
        return axiosInstance.put(`/librariesLibrary/${userId}/${classId}/${itemID}`, data, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    },
    deleteLibraryEntry: async (userId, classId, itemID, csrfToken) => {
        return axiosInstance.delete(`/deleteLibraryEntry/${userId}/${classId}/${itemID}`, {
            headers: {
                'x-CSRF-Token': csrfToken
            }
        }).then(response => response.data);
    }
};
