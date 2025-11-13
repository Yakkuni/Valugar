// src/services/authService.ts
import api from './api';

// ==================== INTERFACES ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface RegisterAdminRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  creationCode: string;
}

export interface RegisterResponse {
  id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
  isBlocked: boolean;
}

// ==================== AUTH ENDPOINTS ====================

/**
 * POST /auth/login
 * Login do usuário
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    
    // Salva os tokens no localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao fazer login' };
  }
};

/**
 * POST /auth/refresh-token
 * Login do usuário por meio do refresh token
 */
export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/refresh-token', {
      refreshToken,
    });
    
    // Atualiza os tokens no localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao renovar token' };
  }
};

/**
 * POST /auth/user/register
 * Registra um usuário normal
 */
export const register = async (
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/user/register', {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao registrar usuário' };
  }
};

/**
 * POST /auth/admin/register
 * Registra um administrador
 */
export const registerAdmin = async (
  name: string,
  email: string,
  phone: string,
  password: string,
  creationCode: string
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/admin/register', {
      name,
      email,
      phone,
      password,
      creationCode,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao registrar administrador' };
  }
};

/**
 * DELETE /auth/user/{id}
 * Deleta um usuário pelo ID (somente admins)
 */
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/auth/user/${id}`);
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao deletar usuário' };
  }
};

/**
 * GET /auth/user
 * Retorna todos os usuários (somente admins)
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/auth/user');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar usuários' };
  }
};

/**
 * GET /auth/user/id/{id}
 * Retorna um usuário pelo ID
 */
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/auth/user/id/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar usuário' };
  }
};

/**
 * GET /auth/user/email/{email}
 * Retorna um usuário pelo email
 */
export const getUserByEmail = async (email: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/auth/user/email/${email}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar usuário' };
  }
};

/**
 * GET /auth/verify-email/?token=SEU_TOKEN
 * Verifica um e-mail de usuário pelo token
 */
export const verifyEmail = async (token: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/auth/verify-email/?token=${token}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao verificar e-mail' };
  }
};