import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

// Marcadores de guia de design (visíveis apenas no modo de desenvolvimento)
const DesignGuides = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  .blue-guide {
    position: absolute;
    border: 1px solid #0099ff;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  
  .pink-guide {
    position: absolute;
    border: 1px solid #ff00ff;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
  }
`;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showGuides, setShowGuides] = useState(false); // Para desenvolvimento
  
  return (
    <PageWrapper>
      <LoginContainer>
        {/* Guias de design visíveis apenas em desenvolvimento */}
        {showGuides && (
          <DesignGuides>
            <div className="blue-guide"></div>
            <div className="pink-guide"></div>
          </DesignGuides>
        )}
        
        <FormTitle>Acessar minha conta</FormTitle>
        
        <form>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="Digite seu email" />
          </FormGroup>
          
          <FormGroup>
            <Label>Senha</Label>
            <PasswordField>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Digite sua senha" 
              />
              <PasswordVisibilityButton 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </PasswordVisibilityButton>
            </PasswordField>
          </FormGroup>
          
          <LoginButton type="submit">Entrar</LoginButton>
          
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