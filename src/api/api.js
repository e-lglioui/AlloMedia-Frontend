import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});


const refreshAccessToken = async () => {
  try {
    const response = await api.post('/refresh-token'); 
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken); 
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    window.location.href = '/login'; 
  }
};

// Intercepteur pour renouveler le token automatiquement
api.interceptors.response.use(
  (response) => {
    return response; 
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      }
    }
    return Promise.reject(error);
  }
);

// Ajouter le token aux requêtes sortantes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
