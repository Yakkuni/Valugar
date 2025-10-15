// src/services/api.ts
import axios from 'axios';

// A URL base da sua API, sem o prefixo /api
const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se de que esta é a porta correta do seu backend
});

export default api;