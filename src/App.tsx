// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from './context/ThemeContext';

// Importe a Rota Protegida
import ProtectedRoute from './routes/ProtectedRoute';

// Importe seus componentes e páginas
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnunciarImovelPage from './pages/AnunciarImovelPage';
import SearchPage from './pages/SearchPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { lightTheme, darkTheme } from './styles/theme';

function App() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <div className="app" data-theme={theme}>
        <Header />
        <main>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/entrar" element={<LoginPage />} />
            <Route path="/cadastrar" element={<RegisterPage />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/imoveis/:id" element={<PropertyDetailPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            
            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/anunciar" element={<AnunciarImovelPage />} />
              {/* Adicione aqui outras rotas que precisam de login, ex: /meu-perfil */}
            </Route>

            {/* Rota Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StyledThemeProvider>
  );
}

export default App;