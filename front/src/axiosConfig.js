import axios from 'axios';
import config from '../config';

axios.interceptors.request.use(
  requestConfig => {
    const token = localStorage.getItem('b4y-token');
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = config.backend;

export default axios;
