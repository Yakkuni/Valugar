import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fff;
`;

const RegisterContainer = styled.div`
  max-width: 500px; // Diminuído para comportar apenas o formulário
  width: 100%;
  margin: 0 auto; // Centraliza horizontalmente
  position: relative;
  border: 1px solid #e0e0e0; // Adiciona borda sutil ao redor do formulário
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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showGuides, setShowGuides] = useState(false); // Para desenvolvimento
  
  return (
    <PageWrapper>
      <RegisterContainer>
        {/* Guias de design visíveis apenas em desenvolvimento */}
        {showGuides && (
          <DesignGuides>
            <div className="blue-guide"></div>
            <div className="pink-guide"></div>
          </DesignGuides>
        )}
        
        <FormTitle>Criar conta</FormTitle>
        
        <form>
          <FormGroup>
            <Label>Nome completo</Label>
            <Input type="text" placeholder="Digite seu nome completo" />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="Digite seu email" />
          </FormGroup>
          
          <FormGroup>
            <Label>Telefone</Label>
            <Input type="tel" placeholder="(00) 00000-0000" />
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
          
          <FormGroup>
            <Label>Confirmar senha</Label>
            <PasswordField>
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirme sua senha" 
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
            <input type="checkbox" id="terms" />
            <span>
              Eu aceito os <Link to="/termos">Termos de Uso</Link> e <Link to="/politica">Política de privacidade</Link>
            </span>
          </TermsCheckbox>
          
          <SubmitButton type="submit">Criar conta</SubmitButton>
          
          <LoginPrompt>
            Já possui uma conta? <Link to="/entrar">Faça login</Link>
          </LoginPrompt>
        </form>
      </RegisterContainer>
    </PageWrapper>
  );
};

export default RegisterPage;