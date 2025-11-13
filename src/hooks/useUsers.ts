// src/hooks/useUsers.ts
import { useState, useCallback } from 'react';
import { 
  getAllUsers, 
  getUserById, 
  getUserByEmail, 
  deleteUser,
  registerAdmin
} from '../services/authServices';
import { User } from '../types';

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const getAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar usuários');
      setLoading(false);
      throw err;
    }
  }, []);

  const getById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(id);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar usuário');
      setLoading(false);
      throw err;
    }
  }, []);

  const getByEmail = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserByEmail(email);
      setUser(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar usuário');
      setLoading(false);
      throw err;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar usuário');
      setLoading(false);
      throw err;
    }
  }, []);

  const createAdmin = useCallback(async (
    name: string,
    email: string,
    phone: string,
    password: string,
    creationCode: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAdmin(name, email, phone, password, creationCode);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar administrador');
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    users,
    user,
    getAll,
    getById,
    getByEmail,
    remove,
    createAdmin,
  };
};
