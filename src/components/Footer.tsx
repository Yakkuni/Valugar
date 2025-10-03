import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  background-color: #0090C1;
  color: white;
  padding: 40px 0 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  margin-bottom: 20px;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 600;
  
  img {
    height: 38px;
    margin-right: 10px;
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.8;
`;

const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const FooterLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.7;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterColumn>
          <FooterLogo>
            <img src="/imagens/valugar-logo.png" alt="Valugar" />
          </FooterLogo>
          <FooterText>
            Encontre seu imóvel ideal para alugar ou comprar nas principais cidades do Vale do Jaguaribe.
          </FooterText>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Acesso Rápido</FooterTitle>
          <FooterLink to="/buscar">Alugar imóvel</FooterLink>
          <FooterLink to="/buscar">Comprar imóvel</FooterLink>
          <FooterLink to="/anunciar">Anunciar</FooterLink>
          <FooterLink to="/sobre">Sobre nós</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Categorias</FooterTitle>
          <FooterLink to="/buscar?cat=residencial">Imóveis residenciais</FooterLink>
          <FooterLink to="/buscar?cat=comercial">Imóveis comerciais</FooterLink>
          <FooterLink to="/destaque">Destaques</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contato</FooterTitle>
          <FooterText>Rua ABC, 123</FooterText>
          <FooterText>Tabuleiro do Norte, CE</FooterText>
          <FooterText>email@valugar.com</FooterText>
        </FooterColumn>
      </FooterContainer>
      
      <Copyright>
        © 2025 Valugar. Todos os direitos reservados.
      </Copyright>
    </StyledFooter>
  );
};

export default Footer;