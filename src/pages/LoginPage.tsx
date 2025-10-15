import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Importe o hook de autenticação

// --- Styled Components (do seu arquivo original) ---

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fff;
`;

const LoginContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
  color: #0090C1;
  font-size: 26px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;

  &::placeholder {
    color: #aaa;
  }
`;

const PasswordField = styled.div`
  position: relative;
`;

const PasswordVisibilityButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: center;
  font-size: 14px;
  color: #0090C1;
  margin: 10px 0 20px;
  text-decoration: none;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #0090C1;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #007aa9;
  }

  &:disabled {
    background-color: #a0d8e9;
    cursor: not-allowed;
  }
`;

const RegisterPrompt = styled.p`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
  
  a {
    color: #0090C1;
    text-decoration: none;
    font-weight: 500;
  }
`;

// --- Novos Styled Components para Feedback ---

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.p`
  color: #10b981;
  background-color: #f0fdf4;
  border: 1px solid #a7f3d0;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
`;

// --- Componente LoginPage Atualizado ---

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para controlar os campos, erro e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth(); // Obtenha a função de login do seu AuthContext
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const location = useLocation(); // Hook para acessar o state da navegação

  useEffect(() => {
    // Verifica se há uma mensagem de sucesso vinda da página de registro
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpa o state para não mostrar a mensagem novamente ao navegar
      window.history.replaceState({}, document.title)
    }
  }, [location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setError(''); 
    setSuccessMessage('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      // O login foi bem-sucedido, redireciona para a página inicial
      navigate('/'); 
    } catch (err: any) {
      // Define a mensagem de erro vinda do backend ou uma genérica
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageWrapper>
      <LoginContainer>
        <FormTitle>Acessar minha conta</FormTitle>
        
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          
          <FormGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder="Digite seu email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Senha</Label>
            <PasswordField>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Digite sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <PasswordVisibilityButton 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </PasswordVisibilityButton>
            </PasswordField>
          </FormGroup>
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </LoginButton>
          
          <ForgotPassword to="/esqueci-senha">Esqueci minha senha</ForgotPassword>
          
          <RegisterPrompt>
            Não possui uma conta? <Link to="/cadastrar">Cadastre-se</Link>
          </RegisterPrompt>
        </form>
      </LoginContainer>
    </PageWrapper>
  );
};

export default LoginPage;