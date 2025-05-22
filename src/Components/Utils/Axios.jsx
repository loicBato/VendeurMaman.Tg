


import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://maman.cofalab.com/api',
  // baseURL: 'http://127.0.0.1:8000/api',
  // baseURL: 'http://192.168.3.212:8000/api',
  // baseURL: 'http://192.168.1.72:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expiré ou non valide.');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default Axios;
