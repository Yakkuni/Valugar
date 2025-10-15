import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FeaturedProperties from '../components/FeaturedProperties';

const HeroSection = styled.section`
  background-color: #0090C1;
  padding: 0; // Removido o padding para controlar altura exata
  height: 592px; // Altura exata de 592px conforme a resolução que você precisa
  width: 100%; // Garante que ocupe toda a largura
  display: flex;
  align-items: center;
`;

const HeroContainer = styled.div`
  max-width: 1440px; // Largura exata de 1440px conforme sua necessidade
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  gap: 300px;
  align-items: center;
  height: 100%; // Garante que ocupe toda a altura do HeroSection
`;

// Para o conteúdo (texto e busca)
const HeroContent = styled.div`
  color: white;
  max-width: 500px;
  padding: 20px 0; // Adicionado padding vertical para espaçamento interno
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const HeroSubtitle = styled.h2`
  font-size: 36px;
  color: #FFD700;
  font-weight: 700;
  margin-bottom: 30px;
`;

const HeroImage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  img {
    max-height: 580px; // Quase altura total do hero (592px)
    width: auto;
    object-fit: contain;
  }
`;

const SearchBox = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

// CORREÇÃO AQUI: `active` virou `$active`
const Tab = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#0090C1' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#555'};
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 12px 15px;
  font-size: 14px;
  outline: none;
`;

const SearchButton = styled.button`
  width: 40px;
  border: none;
  background: #0090C1;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeaturedSection = styled.section`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const CategoriesSection = styled.section`
  padding: 40px 0 60px;
  background: #f5f5f5;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CategoryCard = styled(Link)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 180px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.3);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryTitle = styled.span`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-weight: 600;
  z-index: 2;
`;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('residencial');
  
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>Encontre o imóvel</HeroTitle>
            <HeroSubtitle>ideal para você</HeroSubtitle>
            
            <SearchBox>
              <TabsContainer>
                {/* CORREÇÃO AQUI: `active` virou `$active` */}
                <Tab $active={activeTab === 'residencial'} onClick={() => setActiveTab('residencial')}>
                  <span>Residencial <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWhvdXNlLWljb24gbHVjaWRlLWhvdXNlIj48cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiLz48cGF0aCBkPSJNMyAxMGEyIDIgMCAwIDEgLjcwOS0xLjUyOGw3LTZhMiAyIDAgMCAxIDIuNTgyIDBsNyA2QTIgMiAwIDAgMSAyMSAxMHY5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg=="/></span>
                </Tab>
                <Tab $active={activeTab === 'comercial'} onClick={() => setActiveTab('comercial')}>
                  <span>Comercial <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJ1aWxkaW5nLWljb24gbHVjaWRlLWJ1aWxkaW5nIj48cGF0aCBkPSJNMTIgMTBoLjAxIi8+PHBhdGggZD0iTTEyIDE0aC4wMSIvPjxwYXRoIGQ9Ik0xMiA2aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxMGguMDEiLz48cGF0aCBkPSJNMTYgMTRoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTggMTRoLjAxIi8+PHBhdGggZD0iTTggNmguMDEiLz48cGF0aCBkPSJNOSAyMnYtM2ExIDEgMCAwIDEgMS0xaDRhMSAxIDAgMCAxIDEgMXYzIi8+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjwvc3ZnPg=="/></span>
                </Tab>
              </TabsContainer>
              
              <SearchInput>
                <Input placeholder="Cidade, bairro ou região" />
                <SearchButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </SearchButton>
              </SearchInput>
            </SearchBox>
          </HeroContent>
          
          <HeroImage>
            <img src="/imagens/house-3d.png" alt="Casa 3D" />
          </HeroImage>
        </HeroContainer>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Imóveis em destaque</SectionTitle>
        <FeaturedProperties />
      </FeaturedSection>
      
      <CategoriesSection>
        <SectionTitle>Categorias</SectionTitle>
        <CategoryGrid>
          <CategoryCard to="/contato">
            <img src="/imagens/contato.jpg" alt="Entre em Contato" />
            <CategoryTitle>Entre em Contato</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/sobre">
            <img src="/imagens/sobre.jpg" alt="Sobre nós" />
            <CategoryTitle>Sobre nós</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/imoveis-destaque">
            <img src="/imagens/destaque.jpg" alt="Imóveis em Destaque" />
            <CategoryTitle>Imóveis em Destaque</CategoryTitle>
          </CategoryCard>
          <CategoryCard to="/anunciar">
            <img src="/imagens/anuncio.jpg" alt="Anunciar Imóvel" />
            <CategoryTitle>Anunciar Imóvel</CategoryTitle>
          </CategoryCard>
        </CategoryGrid>
      </CategoriesSection>
    </>
  );
};

export default HomePage;