import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: white;
  padding: 12px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: #0090C1;
  text-decoration: none;
  
  img {
    height: 38px;
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #444;
  margin-left: 22px;
  font-size: 14px;
  text-decoration: none;
  
  &:hover {
    color: #0090C1;
  }
`;

const EntrarButton = styled(Link)`
  background-color: #0090C1;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  text-decoration: none;
  margin-left: 22px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo to="/">
          <img src="/imagens/valugar-logo.png" alt="Valugar" />
        </Logo>
        <Nav>
          <NavLink to="/buscar">Buscar imóvel</NavLink>
          <NavLink to="/anunciar">Anunciar imóvel</NavLink>
          <NavLink to="/sobre">Sobre nós</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <EntrarButton to="/cadastrar">Cadastrar</EntrarButton>
          <EntrarButton to="/entrar">Entrar</EntrarButton>
          
        </Nav>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;