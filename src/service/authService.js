
import api from '../api/api'; 

export const logout = async () => {
  try {
  
    await api.post('/logout');

    
    localStorage.removeItem('accessToken');

    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
