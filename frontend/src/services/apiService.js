import axios from 'axios';

axios.defaults.withCredentials = true;

const apiService = axios.create({
  baseURL: 'http://localhost:3001',
});

export default apiService;
