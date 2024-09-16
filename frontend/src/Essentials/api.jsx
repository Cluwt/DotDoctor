
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/', // URL base para suas requisições
});

export default api;
