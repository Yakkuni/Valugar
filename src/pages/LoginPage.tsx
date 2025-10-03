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
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 40px;
  align-items: center;
`;

const FormColumn = styled.div`
  padding-left: 40px;
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

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  font-size: 14px;
  color: #0090C1;
  margin-top: 5px;
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
  margin: 20px 0;
  
  &:hover {
    background-color: #007aa9;
  }
`;

const RegisterPrompt = styled.p`
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
  height: 550px;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const MarketingContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  background: rgba(245, 245, 245, 0.7);
  
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <PageWrapper>
      <LoginContainer>
        <FormColumn>
          <FormTitle>Bem vindo(a) de volta!</FormTitle>
          
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
              <ForgotPassword to="/esqueci-senha">Esqueceu sua senha?</ForgotPassword>
            </FormGroup>
            
            <LoginButton type="submit">Entrar</LoginButton>
            
            <RegisterPrompt>
              Não possui uma conta? <Link to="/cadastrar">Cadastre-se</Link>
            </RegisterPrompt>
          </form>
        </FormColumn>
        
        <ImageColumn>
          <PropertyImage src="/imagens/imagemCadastro.jpg" alt="Imóvel moderno" />
        </ImageColumn>
      </LoginContainer>
    </PageWrapper>
  );
};

export default LoginPage;