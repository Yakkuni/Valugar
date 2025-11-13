import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginService } from '../services/authServices';
import api from '../services/api';

// Interface para definir a estrutura do objeto de usuário, baseada na resposta da sua API
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
}

// Interface para o que o nosso contexto vai fornecer
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean; // Exposto para ser usado pelas rotas protegidas
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Inicia como true para verificar o token

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          const decodedToken: { id: string } = jwtDecode(token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Busca os dados do usuário na API usando o ID do token
          // A rota vem do seu backend: /auth/user/id/:id
          const response = await api.get(`/auth/user/id/${decodedToken.id}`);
          
          setUser(response.data);
          setAccessToken(token);
        } catch (error: any) {
          // Se for erro de rede, mostra mensagem mais clara
          if (error.code === 'ERR_NETWORK') {
            console.warn('⚠️ Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:3000');
          } else {
            console.error("Falha ao carregar usuário a partir do token:", error.message);
          }
          // Limpa o estado se o token for inválido ou a chamada falhar
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      // Finaliza o carregamento inicial, independentemente de ter encontrado um token ou não
      setLoading(false); 
    };

    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      
      const decodedToken: { id: string } = jwtDecode(data.accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      
      // Busca os dados do usuário logo após o login ser bem-sucedido
      const response = await api.get(`/auth/user/id/${decodedToken.id}`);
      
      setUser(response.data);
      setAccessToken(data.accessToken);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: !!user, // Autenticado se existir um objeto de usuário
      user, // Fornece o objeto de usuário completo
      accessToken,
      loading, // Fornece o estado de carregamento
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};