import axios from "axios";
import config from "../../config";

// Création d'une instance d'axios configurée avec les en-têtes par défaut
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
    config.headers["Content-Type"] = "application/json";
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const apiVerifyToken = async () => {
    return axiosInstance.get(`/verifyToken`);
};

export const createUser = (data, csrfToken) => {
    return axiosInstance.post(`/user/save`, data, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    }).then(response => response.data)
      .catch(err => Promise.reject(err?.response?.data || { error: "Une erreur réseau est survenue" }));
};

export const loginUser = (data, csrfToken) => {
    return axiosInstance.post(`/user/login`, data, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    }).then(response => response.data)
      .catch(err => Promise.reject(err?.response?.data || { error: "Une erreur réseau est survenue" }));
};

export const updateProfil = (data, userId, csrfToken) => {
    return axiosInstance.put(`/user/update/${userId}`, data, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    }).then(response => response.data)
      .catch(err => Promise.reject(err?.response?.data || { error: "Une erreur réseau est survenue" }));
};

export const getUsers = () => {
    return axiosInstance.get(`/admin/users`)
        .then(response => response.data)
        .catch(err => Promise.reject(err?.response?.data || { error: "Une erreur réseau est survenue" }));
};

export const deleteUser = (userId, csrfToken) => {
    return axiosInstance.delete(`/user/delete/${userId}`, {
        headers: {
            "X-CSRF-Token": csrfToken
        }
    }).then(response => response.data)
      .catch(err => Promise.reject(err?.response?.data || { error: "Une erreur réseau est survenue" }));
};