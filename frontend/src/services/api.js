import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('python_mastery_access');
      localStorage.removeItem('python_mastery_refresh');
      localStorage.removeItem('python_mastery_user');
    }
    return Promise.reject(error);
  }
);

export default api;
