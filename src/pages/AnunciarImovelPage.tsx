import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 5px;
`;

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 30px;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 0;
`;

const Step = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  position: relative;
  z-index: 1;
`;

const StepIcon = styled.div<{ active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#0090C1' : '#f5f5f5'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: ${props => props.active ? 'white' : '#777'};
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center;
  max-width: 120px;
`;

const ContentSection = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const PropertyTypeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PropertyTypeCard = styled.div<{ active?: boolean }>`
  border: 2px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  
  &:hover {
    border-color: #0090C1;
  }
`;

const PropertyTypeIcon = styled.div`
  font-size: 32px;
  color: #0090C1;
  margin-bottom: 15px;
`;

const PropertyTypeTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
`;

const PropertyTypeDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #666;
  text-decoration: none;
  font-size: 15px;
  
  &:hover {
    color: #0090C1;
  }
`;

const ContinueButton = styled.button`
  background-color: #0090C1;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #007aa9;
  }
  
  span {
    margin-right: 8px;
  }
`;

const StepCounter = styled.div`
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

const AnunciarImovelPage = () => {
  const [propertyType, setPropertyType] = useState<'residencial' | 'comercial' | null>('residencial');
  
  return (
    <PageWrapper>
      <PageTitle>Anunciar Imóvel</PageTitle>
      <PageSubtitle>Vamos te ajudar a anunciar seu imóvel de forma simples e rápida</PageSubtitle>
      
      <StepsContainer>
        <StepConnector />
        
        <Step active={true}>
          <StepIcon active={true}>
            <i className="fas fa-home">🏠</i>
          </StepIcon>
          <StepLabel>Tipo do imóvel</StepLabel>
        </Step>
        
        <Step>
          <StepIcon>
            <i className="fas fa-info-circle">ℹ️</i>
          </StepIcon>
          <StepLabel>Informações básicas</StepLabel>
        </Step>
        
        <Step>
          <StepIcon>
            <i className="fas fa-map-marker-alt">📍</i>
          </StepIcon>
          <StepLabel>Localização</StepLabel>
        </Step>
        
        <Step>
          <StepIcon>
            <i className="fas fa-camera">📷</i>
          </StepIcon>
          <StepLabel>Fotos</StepLabel>
        </Step>
        
        <Step>
          <StepIcon>
            <i className="fas fa-user">👤</i>
          </StepIcon>
          <StepLabel>Contato</StepLabel>
        </Step>
      </StepsContainer>
      
      <ContentSection>
        <SectionTitle>Que tipo de imóvel você quer anunciar?</SectionTitle>
        <SectionSubtitle>Escolha a categoria que melhor descreve seu imóvel</SectionSubtitle>
        
        <PropertyTypeContainer>
          <PropertyTypeCard 
            active={propertyType === 'residencial'}
            onClick={() => setPropertyType('residencial')}
          >
            <PropertyTypeIcon>🏠</PropertyTypeIcon>
            <PropertyTypeTitle>Residencial</PropertyTypeTitle>
            <PropertyTypeDescription>Casa, apartamento, kitnet</PropertyTypeDescription>
          </PropertyTypeCard>
          
          <PropertyTypeCard 
            active={propertyType === 'comercial'}
            onClick={() => setPropertyType('comercial')}
          >
            <PropertyTypeIcon>🏢</PropertyTypeIcon>
            <PropertyTypeTitle>Comercial</PropertyTypeTitle>
            <PropertyTypeDescription>Loja, escritório, galpão</PropertyTypeDescription>
          </PropertyTypeCard>
        </PropertyTypeContainer>
      </ContentSection>
      
      <NavigationButtons>
        <BackButton to="/">
          ← Voltar
        </BackButton>
        
        <StepCounter>Passo 1 de 5</StepCounter>
        
        <ContinueButton>
          <span>Continuar</span>
          →
        </ContinueButton>
      </NavigationButtons>
    </PageWrapper>
  );
};

export default AnunciarImovelPage;