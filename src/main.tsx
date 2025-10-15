// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { PropertyProvider } from './context/PropertyContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx'; // Importe o AuthProvider
import { GlobalStyle } from './styles/GlobalStyle.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider> {/* Adicione o AuthProvider aqui */}
          <PropertyProvider>
            <GlobalStyle />
            <App />
          </PropertyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);