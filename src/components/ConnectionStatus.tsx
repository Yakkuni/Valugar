import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const StatusBadge = styled.div<{ isConnected: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.isConnected ? '#28a745' : '#dc3545'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StatusDot = styled.span<{ isConnected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation: ${props => props.isConnected ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.get('/health'); // Endpoint de health check (se existir)
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    // Verifica a conexão imediatamente
    checkConnection();

    // Verifica a cada 30 segundos
    const interval = setInterval(checkConnection, 30000);

    // Esconde o badge após 10 segundos se estiver conectado
    const hideTimeout = setTimeout(() => {
      if (isConnected) {
        setShowStatus(false);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, [isConnected]);

  // Só mostra em desenvolvimento
  if (import.meta.env.MODE === 'production' || !showStatus) {
    return null;
  }

  return (
    <StatusBadge 
      isConnected={isConnected}
      onClick={() => setShowStatus(false)}
      title="Clique para ocultar"
    >
      <StatusDot isConnected={isConnected} />
      {isConnected ? 'API Conectada' : 'API Desconectada'}
    </StatusBadge>
  );
};

export default ConnectionStatus;
