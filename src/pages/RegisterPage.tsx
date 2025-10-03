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
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 40px;
  align-items: center;
`;

const FormColumn = styled.div`
  padding-left: 40px; // Adicionado para mover o formulário para a direita
`;

const FormTitle = styled.h2`
  color: #0090C1;
  font-size: 26px;
  margin-bottom: 30px;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
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
  
  a {
    color: #0090C1;
    text-decoration: none;
    font-weight: 500;
  }
`;

const ImageColumn = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: auto; // Alterado de altura fixa para auto
  padding: 20px; // Adiciona algum espaçamento interno
  display: flex;
  flex-direction: column; // Organiza elementos em coluna
  align-items: center;
  justify-content: center;
`;

const MarketingContent = styled.div`
  text-align: center;
  padding: 30px;
  
  h2 {
    font-size: 32px;
    color: #555;
    font-weight: 300;
    margin-bottom: 5px;
  }
  
  .highlight {
    color: #444;
    font-size: 38px;
    font-weight: 500;
    margin-bottom: 15px;
    display: block;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }
`;

const PropertyImage = styled.img`
  width: 100%; // Usa 100% da largura do container
  height: auto; // Mantém a proporção da imagem
  position: relative; // Mudado de absolute para relative
  display: block; // Garante que a imagem se comporte como bloco
  margin: 0 auto; // Centraliza horizontalmente
`;

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <PageWrapper>
      <RegisterContainer>
        <FormColumn>
          <FormTitle>Crie sua conta</FormTitle>
          
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
            
            <SubmitButton type="submit">Criar Conta</SubmitButton>
            
            <LoginPrompt>
              Já possui uma conta? <Link to="/login">Faça login</Link>
            </LoginPrompt>
          </form>
        </FormColumn>
        
        <ImageColumn>
          <PropertyImage src="/imagens/imagemCadastro.jpg" alt="Imóvel moderno" />
        </ImageColumn>
      </RegisterContainer>
    </PageWrapper>
  );
};

export default RegisterPage;