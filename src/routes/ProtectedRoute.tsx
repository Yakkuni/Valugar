// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto o contexto está verificando o token, mostramos um loading
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/entrar" replace />;
  }

  // Se estiver autenticado, renderiza a página solicitada (ex: /anunciar)
  return <Outlet />;
};

export default ProtectedRoute;