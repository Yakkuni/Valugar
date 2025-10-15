import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register as registerService } from '../services/authServices'; // Importa nosso serviço de cadastro

// --- Styled Components (do seu arquivo original, sem alterações) ---

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fff;
`;

const RegisterContainer = styled.div`
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

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  
  input {
    margin: 4px 10px 0 0;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
  
  a {
    color: #0090C1;
    text-decoration: none;
  }
`;

const SubmitButton = styled.button`
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

const LoginPrompt = styled.p`
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

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
`;

// --- Componente RegisterPage Atualizado ---

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Estados para controle de UI
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Validações
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!agreedToTerms) {
      setError('Você precisa aceitar os Termos de Uso e a Política de Privacidade.');
      return;
    }

    setLoading(true);
    try {
      await registerService(name, email, phone, password);
      // Sucesso! Redireciona o usuário para a página de login.
      // Opcional: envia uma mensagem de sucesso para a página de login.
      navigate('/entrar', { state: { message: 'Cadastro realizado com sucesso! Faça o login.' } });
    } catch (err: any) {
      // Exibe a mensagem de erro vinda do backend ou uma genérica
      setError(err.message || 'Ocorreu um erro ao criar a conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageWrapper>
      <RegisterContainer>
        <FormTitle>Criar conta</FormTitle>
        
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>Nome completo</Label>
            <Input 
              type="text" 
              placeholder="Digite seu nome completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </FormGroup>
          
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
            <Label>Telefone</Label>
            <Input 
              type="tel" 
              placeholder="(00) 00000-0000" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          
          <FormGroup>
            <Label>Confirmar senha</Label>
            <PasswordField>
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirme sua senha" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <PasswordVisibilityButton 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </PasswordVisibilityButton>
            </PasswordField>
          </FormGroup>
          
          <TermsCheckbox>
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={loading}
            />
            <span>
              Eu aceito os <Link to="/termos">Termos de Uso</Link> e <Link to="/politica">Política de privacidade</Link>
            </span>
          </TermsCheckbox>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </SubmitButton>
          
          <LoginPrompt>
            Já possui uma conta? <Link to="/entrar">Faça login</Link>
          </LoginPrompt>
        </form>
      </RegisterContainer>
    </PageWrapper>
  );
};

export default RegisterPage;