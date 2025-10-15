// src/services/authService.ts
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    // Retorna os dados do login (accessToken, refreshToken)
    return response.data;
  } catch (error) {
    // Lança o erro para ser tratado no componente
    throw error.response.data;
  }

  
}

export const register = async (name, email, phone, password) => {
  try {
    // Usando a rota confirmada pela imagem do Swagger
    const response = await api.post('/auth/user/register', {
      name,
      email,
      phone,
      password,
    });
    return response.data; // Retorna { id: "string" } em caso de sucesso
  } catch (error) {
    throw error.response.data;
  }
};;