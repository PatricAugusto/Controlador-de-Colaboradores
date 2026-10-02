import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

// Interceptor para adicionar o Token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Controlador:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para capturar erros 401 (Sessão Expirada)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@Controlador:token');
      localStorage.removeItem('@Controlador:user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);