import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../hooks/useListings';
import { CreateListingRequest } from '../types';

// Tipos de dados para o formulário
type PropertyType = 'residencial' | 'comercial' | null;
type ResidentialType = 'casa' | 'apartamento' | 'kitnet' | 'quarto' | 'sitio' | 'outros' | null;
type ContactPreference = 'qualquer' | 'telefone' | 'email' | null;

// Etapas do formulário
type FormStep = 'tipo' | 'info' | 'localizacao' | 'fotos' | 'contato';

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
  padding: 0 20px;
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
  color: #333;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4px;
`;

const StepDescription = styled.div`
  font-size: 12px;
  color: #777;
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

const BackButtonPlain = styled.button`
  display: flex;
  align-items: center;
  color: #666;
  background: none;
  border: none;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    color: #0090C1;
  }
`;

const ContinueButton = styled.button`
  background-color: #0090C1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 25px;
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

const FinalizeButton = styled(ContinueButton)`
  background-color: #28a745;
  
  &:hover {
    background-color: #218838;
  }
`;

const StepCounter = styled.div`
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

const BackButtonWithAvatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeaturedOptionSection = styled.section`
  margin: 40px 0;
`;

const FeaturedOptionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-left: 5px;
    color: #777;
  }
`;

const FeaturedOptionSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const FeaturedChoicesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const FeaturedChoice = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  cursor: pointer;
  width: 375px;
  
  &:hover {
    border-color: #0090C1;
  }
`;

const ChoiceIcon = styled.div<{ isChecked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: ${props => props.isChecked ? '#0090C1' : '#777'};
  font-size: 18px;
  width: 20px;
`;

const ChoiceText = styled.span`
  flex: 1;
`;

// Componentes para a seção de informações básicas
const FormSection = styled.div`
  margin-bottom: 30px;
`;

const FormSectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  color: #333;
`;

const FormSectionSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    border-color: #0090C1;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    border-color: #0090C1;
    outline: none;
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 20px;
  
  &:focus {
    border-color: #0090C1;
    outline: none;
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const PropertyTypeOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const PropertyTypeOption = styled.div<{ active?: boolean }>`
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  
  &:hover {
    border-color: #0090C1;
  }
`;

const PropertyOptionIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const PropertyOptionText = styled.span`
  font-size: 14px;
  text-align: center;
`;

const NumberCounter = styled.div`
  display: flex;
  gap: 10px;
`;

const CounterButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #0090C1;
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const AmenityOption = styled.div<{ active?: boolean }>`
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  
  &:hover {
    border-color: #0090C1;
  }
`;

const AmenityIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const AmenityText = styled.span`
  font-size: 12px;
  text-align: center;
`;

// Componentes para a seção de upload de fotos
const PhotoUploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover {
    border-color: #0090C1;
  }
`;

const PhotoUploadIcon = styled.div`
  font-size: 40px;
  color: #aaa;
  margin-bottom: 15px;
`;

const PhotoUploadText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
`;

const PhotoUploadSubtext = styled.p`
  font-size: 14px;
  color: #999;
`;

const SelectPhotoButton = styled.button`
  background-color: white;
  color: #0090C1;
  border: 1px solid #0090C1;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #f0f8fb;
  }
`;

const PhotoTipsSection = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const PhotoTipsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const PhotoTipsSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const TipsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TipItem = styled.li`
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
  font-size: 14px;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #0090C1;
  }
`;

const AccordionSection = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const AccordionHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #f9f9f9;
`;

const AccordionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const AccordionIcon = styled.div`
  font-size: 16px;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  padding: ${props => props.isOpen ? '15px' : '0'};
  border-top: ${props => props.isOpen ? '1px solid #ddd' : 'none'};
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

// Componentes para a seção de contato
const ContactOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 30px 0;
`;

const ContactOption = styled.div<{ active?: boolean }>`
  border: 1px solid ${props => props.active ? '#0090C1' : '#e0e0e0'};
  border-radius: 4px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#e6f7fc' : 'white'};
  
  &:hover {
    border-color: #0090C1;
  }
`;

const ContactOptionIcon = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  color: #0090C1;
`;

const ContactOptionText = styled.span`
  font-size: 14px;
  text-align: center;
`;

// Componentes para formatação monetária
const CurrencyInputWrapper = styled.div`
  position: relative;
`;

const CurrencyPrefix = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
`;

const CurrencyInput = styled.input`
  width: 100%;
  padding: 10px 15px 10px 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    border-color: #0090C1;
    outline: none;
  }
`;

const AnunciarImovelPage = () => {
  // Context
  const { user } = useAuth();
  const { create, loading } = useListings();
  
  // Estados para controlar as etapas e dados do formulário
  const [currentStep, setCurrentStep] = useState<FormStep>('tipo');
  const [propertyType, setPropertyType] = useState<PropertyType>('residencial');
  const [wantsFeatured, setWantsFeatured] = useState<boolean>(true);
  
  // Estados para as informações básicas
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [residentialType, setResidentialType] = useState<ResidentialType>(null);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [area, setArea] = useState<string>('');
  const [rent, setRent] = useState<string>('');
  const [additionalCosts, setAdditionalCosts] = useState<boolean>(false);
  const [iptu, setIptu] = useState<string>('');
  const [listingType, setListingType] = useState<'SALE' | 'RENT'>('RENT');
  const [zipCode, setZipCode] = useState<string>('');
  
  // Estados para amenidades
  const [hasGarage, setHasGarage] = useState<boolean>(false);
  const [acceptsPets, setAcceptsPets] = useState<boolean>(false);
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [hasCeramicFloor, setHasCeramicFloor] = useState<boolean>(false);
  const [isFurnished, setIsFurnished] = useState<boolean>(false);
  const [hasOceanView, setHasOceanView] = useState<boolean>(false);
  const [hasGrill, setHasGrill] = useState<boolean>(false);
  const [hasSolarPanel, setHasSolarPanel] = useState<boolean>(false);
  
  // Estados para localização
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [neighborhood, setNeighborhood] = useState<string>('');
  
  // Estados para contato
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactPreference, setContactPreference] = useState<ContactPreference>('qualquer');
  
  // Navegação entre rotas
  const navigate = useNavigate();
  
  // Função para submeter o anúncio
  const submitListing = async () => {
    if (!user) {
      alert('Você precisa estar logado para anunciar um imóvel');
      navigate('/login');
      return;
    }

    // Validações básicas
    if (!title || !description || !rent || !area) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!street || !city || !state || !neighborhood || !zipCode) {
      alert('Por favor, preencha todos os campos de localização');
      return;
    }

    try {
      const listingData: CreateListingRequest = {
        title,
        description,
        type: listingType,
        category: propertyType === 'residencial' ? 'RESIDENCIAL' : propertyType === 'comercial' ? 'COMERCIAL' : 'RESIDENCIAL',
        basePrice: parseFloat(rent.replace(/[^\d,]/g, '').replace(',', '.')),
        iptu: additionalCosts && iptu ? parseFloat(iptu.replace(/[^\d,]/g, '').replace(',', '.')) : 0,
        userId: user.id,
        address: {
          zipCode,
          state,
          city,
          neighborhood,
          street: `${street}${number ? ', ' + number : ''}`,
          reference: complement || undefined,
        },
        details: {
          area,
          bedrooms,
          bathrooms,
        },
      };

      const response = await create(listingData);
      alert('Anúncio criado com sucesso!');
      navigate(`/property/${response.id}`);
    } catch (error: any) {
      console.error('Erro ao criar anúncio:', error);
      alert(error.message || 'Erro ao criar anúncio. Tente novamente.');
    }
  };
  
  // Função para avançar para a próxima etapa
  const nextStep = () => {
    switch (currentStep) {
      case 'tipo':
        setCurrentStep('info');
        break;
      case 'info':
        setCurrentStep('localizacao');
        break;
      case 'localizacao':
        setCurrentStep('fotos');
        break;
      case 'fotos':
        setCurrentStep('contato');
        break;
      case 'contato':
        submitListing();
        break;
    }
  };
  
  // Função para voltar para a etapa anterior
  const previousStep = () => {
    switch (currentStep) {
      case 'info':
        setCurrentStep('tipo');
        break;
      case 'localizacao':
        setCurrentStep('info');
        break;
      case 'fotos':
        setCurrentStep('localizacao');
        break;
      case 'contato':
        setCurrentStep('fotos');
        break;
    }
  };
  
  // Renderização condicional da etapa atual
  const renderStep = () => {
    switch (currentStep) {
      case 'tipo':
        return renderTipoStep();
      case 'info':
        return renderInfoStep();
      case 'localizacao':
        return renderLocalizacaoStep();
      case 'fotos':
        return renderFotosStep();
      case 'contato':
        return renderContatoStep();
      default:
        return renderTipoStep();
    }
  };
  
  // Renderização da etapa "Tipo do imóvel"
  const renderTipoStep = () => (
    <>
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
            <PropertyTypeDescription>Ex: Casa, apartamento, kitnet...</PropertyTypeDescription>
          </PropertyTypeCard>
          
          <PropertyTypeCard 
            active={propertyType === 'comercial'}
            onClick={() => setPropertyType('comercial')}
          >
            <PropertyTypeIcon>🏢</PropertyTypeIcon>
            <PropertyTypeTitle>Comercial</PropertyTypeTitle>
            <PropertyTypeDescription>Ex: Loja, escritório, galpão...</PropertyTypeDescription>
          </PropertyTypeCard>
        </PropertyTypeContainer>
      </ContentSection>
      
      <FeaturedOptionSection>
        <FeaturedOptionTitle>
          Deseja fazer um anúncio mais completo? <span>ⓘ</span>
        </FeaturedOptionTitle>
        <FeaturedOptionSubtitle>
          Adicione mais informações no seu anúncio e dê mais destaque a ele
        </FeaturedOptionSubtitle>
        
        <FeaturedChoicesContainer>
          <FeaturedChoice 
            active={wantsFeatured} 
            onClick={() => setWantsFeatured(true)}
          >
            <ChoiceIcon isChecked={wantsFeatured}>
              {wantsFeatured ? '✓' : ''}
            </ChoiceIcon>
            <ChoiceText>Sim, quero mais destaque pro meu anúncio</ChoiceText>
          </FeaturedChoice>
          
          <FeaturedChoice 
            active={!wantsFeatured}
            onClick={() => setWantsFeatured(false)}
          >
            <ChoiceIcon isChecked={!wantsFeatured}>
              {!wantsFeatured ? '✕' : ''}
            </ChoiceIcon>
            <ChoiceText>Não quero destaque</ChoiceText>
          </FeaturedChoice>
        </FeaturedChoicesContainer>
      </FeaturedOptionSection>
    </>
  );
  
  // Renderização da etapa "Informações básicas"
  const renderInfoStep = () => (
    <>
      <FormSection>
        <FormSectionTitle>Conte-nos sobre seu imóvel</FormSectionTitle>
        <FormSectionSubtitle>Essas informações são a chave para atrair o interessado ideal para o seu imóvel.</FormSectionSubtitle>
        
        <InputGroup>
          <InputLabel>Em poucas palavras descreva seu imóvel</InputLabel>
          <TextInput 
            type="text" 
            placeholder="Ex: Apartamento 2 quartos no Centro" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Descreva seu imóvel com mais detalhes (opcional)</InputLabel>
          <TextArea 
            placeholder="Fale sobre os cômodos, informações importantes, vizinhança, se tem escolas perto..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
      </FormSection>
      
      <FormSection>
        <FormSectionTitle>Informações do imóvel</FormSectionTitle>
        <FormSectionSubtitle>Informações ajudarão os interessados a conhecer melhor seu imóvel</FormSectionSubtitle>
        
        <InputGroup>
          <InputLabel>Tipo do imóvel</InputLabel>
          <PropertyTypeOptionsGrid>
            <PropertyTypeOption 
              active={residentialType === 'casa'} 
              onClick={() => setResidentialType('casa')}
            >
              <PropertyOptionIcon>🏠</PropertyOptionIcon>
              <PropertyOptionText>Casa</PropertyOptionText>
            </PropertyTypeOption>
            
            <PropertyTypeOption 
              active={residentialType === 'apartamento'} 
              onClick={() => setResidentialType('apartamento')}
            >
              <PropertyOptionIcon>🏢</PropertyOptionIcon>
              <PropertyOptionText>Apartamento/ Sobrado</PropertyOptionText>
            </PropertyTypeOption>
            
            <PropertyTypeOption 
              active={residentialType === 'kitnet'} 
              onClick={() => setResidentialType('kitnet')}
            >
              <PropertyOptionIcon>🏠</PropertyOptionIcon>
              <PropertyOptionText>Kitnet</PropertyOptionText>
            </PropertyTypeOption>
            
            <PropertyTypeOption 
              active={residentialType === 'quarto'} 
              onClick={() => setResidentialType('quarto')}
            >
              <PropertyOptionIcon>🛏️</PropertyOptionIcon>
              <PropertyOptionText>Quarto</PropertyOptionText>
            </PropertyTypeOption>
            
            <PropertyTypeOption 
              active={residentialType === 'sitio'} 
              onClick={() => setResidentialType('sitio')}
            >
              <PropertyOptionIcon>🏕️</PropertyOptionIcon>
              <PropertyOptionText>Sítio/ Chácara</PropertyOptionText>
            </PropertyTypeOption>
            
            <PropertyTypeOption 
              active={residentialType === 'outros'} 
              onClick={() => setResidentialType('outros')}
            >
              <PropertyOptionIcon>📦</PropertyOptionIcon>
              <PropertyOptionText>Outros</PropertyOptionText>
            </PropertyTypeOption>
          </PropertyTypeOptionsGrid>
        </InputGroup>
        
        <InputGrid>
          <InputGroup>
            <InputLabel>Número de quartos</InputLabel>
            <NumberCounter>
              <CounterButton 
                active={bedrooms === 1}
                onClick={() => setBedrooms(1)}
              >
                1
              </CounterButton>
              <CounterButton 
                active={bedrooms === 2}
                onClick={() => setBedrooms(2)}
              >
                2
              </CounterButton>
              <CounterButton 
                active={bedrooms === 3}
                onClick={() => setBedrooms(3)}
              >
                3
              </CounterButton>
              <CounterButton 
                active={bedrooms >= 4}
                onClick={() => setBedrooms(4)}
              >
                4+
              </CounterButton>
            </NumberCounter>
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Número de banheiros</InputLabel>
            <NumberCounter>
              <CounterButton 
                active={bathrooms === 1}
                onClick={() => setBathrooms(1)}
              >
                1
              </CounterButton>
              <CounterButton 
                active={bathrooms === 2}
                onClick={() => setBathrooms(2)}
              >
                2
              </CounterButton>
              <CounterButton 
                active={bathrooms >= 3}
                onClick={() => setBathrooms(3)}
              >
                3+
              </CounterButton>
            </NumberCounter>
          </InputGroup>
        </InputGrid>
        
        <InputGroup>
          <InputLabel>Tamanho do imóvel (opcional)</InputLabel>
          <TextInput 
            type="text"
            placeholder="Área em m²"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </InputGroup>
      </FormSection>
      
      {wantsFeatured && (
        <FormSection>
          <FormSectionTitle>Informações adicionais</FormSectionTitle>
          <FormSectionSubtitle>Ótimo! Você escolheu dar mais destaque para o seu anúncio, selecione as opções</FormSectionSubtitle>
          
          <AmenitiesGrid>
            <AmenityOption 
              active={!hasGarage}
              onClick={() => setHasGarage(!hasGarage)}
            >
              <AmenityIcon>🚫</AmenityIcon>
              <AmenityText>Não paga água</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={hasOceanView}
              onClick={() => setHasOceanView(!hasOceanView)}
            >
              <AmenityIcon>🌊</AmenityIcon>
              <AmenityText>Possui garagem</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={acceptsPets}
              onClick={() => setAcceptsPets(!acceptsPets)}
            >
              <AmenityIcon>🐶</AmenityIcon>
              <AmenityText>Aceita pet</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={hasCeramicFloor}
              onClick={() => setHasCeramicFloor(!hasCeramicFloor)}
            >
              <AmenityIcon>🧱</AmenityIcon>
              <AmenityText>Piso de cerâmica</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={isFurnished}
              onClick={() => setIsFurnished(!isFurnished)}
            >
              <AmenityIcon>🏠</AmenityIcon>
              <AmenityText>Imóvel fachada</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={hasGrill}
              onClick={() => setHasGrill(!hasGrill)}
            >
              <AmenityIcon>🍖</AmenityIcon>
              <AmenityText>Possui churrasqueira</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={hasPool}
              onClick={() => setHasPool(!hasPool)}
            >
              <AmenityIcon>🏊</AmenityIcon>
              <AmenityText>Possui piscina</AmenityText>
            </AmenityOption>
            
            <AmenityOption 
              active={hasSolarPanel}
              onClick={() => setHasSolarPanel(!hasSolarPanel)}
            >
              <AmenityIcon>☀️</AmenityIcon>
              <AmenityText>Painel solar</AmenityText>
            </AmenityOption>
          </AmenitiesGrid>
        </FormSection>
      )}
      
      <FormSection>
        <FormSectionTitle>Aluguel e custos</FormSectionTitle>
        <FormSectionSubtitle>Informe o valor do aluguel e possíveis custos extras</FormSectionSubtitle>
        
        <InputGroup>
          <InputLabel>Valor mensal do aluguel</InputLabel>
          <CurrencyInputWrapper>
            <CurrencyPrefix>R$</CurrencyPrefix>
            <CurrencyInput 
              type="text"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </CurrencyInputWrapper>
        </InputGroup>
        
        <AccordionSection>
          <AccordionHeader onClick={() => setAdditionalCosts(!additionalCosts)}>
            <AccordionTitle>Custos adicionais (opcional)</AccordionTitle>
            <AccordionIcon>{additionalCosts ? '↑' : '↓'}</AccordionIcon>
          </AccordionHeader>
          <AccordionContent isOpen={additionalCosts}>
            <InputGroup>
              <FormSectionSubtitle>Informe o valor mensal de custos como condomínio e IPTU que <strong>não</strong> estão inclusos no aluguel</FormSectionSubtitle>
              {/* Aqui você pode adicionar campos para condomínio, IPTU, etc. */}
            </InputGroup>
          </AccordionContent>
        </AccordionSection>
      </FormSection>
    </>
  );
  
  // Renderização da etapa "Localização"
  const renderLocalizacaoStep = () => (
    <FormSection>
      <FormSectionTitle>Onde seu imóvel está localizado</FormSectionTitle>
      <FormSectionSubtitle>Essas informações são a chave para atrair o interessado ideal para o seu imóvel.</FormSectionSubtitle>
      
      <InputGrid>
        <InputGroup>
          <InputLabel>Estado</InputLabel>
          <SelectInput 
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Selecione o estado</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </SelectInput>
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Cidade</InputLabel>
          <TextInput 
            type="text"
            placeholder="Ex: Tabuleiro do norte"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </InputGroup>
      </InputGrid>
      
      <InputGroup>
        <InputLabel>Logradouro</InputLabel>
        <TextInput 
          type="text"
          placeholder="Rua, Avenida, Travessa, Beco..."
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </InputGroup>
      
      <InputGrid>
        <InputGroup>
          <InputLabel>Número</InputLabel>
          <TextInput 
            type="text"
            placeholder="123"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Complemento (opcional)</InputLabel>
          <TextInput 
            type="text"
            placeholder="Ex: Apto 123, Bloco B"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </InputGroup>
      </InputGrid>
      
      <InputGroup>
        <InputLabel>Bairro</InputLabel>
        <TextInput 
          type="text"
          placeholder="Ex: Centro"
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
      </InputGroup>
    </FormSection>
  );
  
  // Renderização da etapa "Fotos"
  const renderFotosStep = () => (
    <>
      <FormSection>
        <FormSectionTitle>Adicione fotos do seu imóvel</FormSectionTitle>
        <FormSectionSubtitle>Fotos atraem mais interessados! Você pode adicionar até 10 fotos</FormSectionSubtitle>
        
        <PhotoUploadArea>
          <PhotoUploadIcon>📷</PhotoUploadIcon>
          <PhotoUploadText>Adicione suas fotos aqui</PhotoUploadText>
          <PhotoUploadSubtext>Arraste e solte suas fotos ou clique para selecionar</PhotoUploadSubtext>
          <SelectPhotoButton>
            <span>📁</span> Selecionar fotos
          </SelectPhotoButton>
        </PhotoUploadArea>
        
        <PhotoUploadSubtext style={{ textAlign: 'center' }}>
          Formatos aceitos: PNG, JPG, JPEG (máx. 10MB por foto)
        </PhotoUploadSubtext>
        
        {wantsFeatured && (
          <PhotoUploadArea style={{ marginTop: '30px' }}>
            <PhotoUploadIcon>🎬</PhotoUploadIcon>
            <PhotoUploadText>Adicione um vídeo do seu imóvel</PhotoUploadText>
            <PhotoUploadSubtext>Tamanho máximo: 100MB</PhotoUploadSubtext>
            <SelectPhotoButton>
              <span>📹</span> Selecionar vídeo
            </SelectPhotoButton>
          </PhotoUploadArea>
        )}
      </FormSection>
      
      <PhotoTipsSection>
        <PhotoTipsTitle>Como tirar boas fotos</PhotoTipsTitle>
        <PhotoTipsSubtitle>Boas fotos atraem mais interessados!</PhotoTipsSubtitle>
        
        <TipsList>
          <TipItem>Tire fotos com boa iluminação (de preferência durante o dia)</TipItem>
          <TipItem>Mostre todos os cômodos principais</TipItem>
          <TipItem>Inclua a fachada do imóvel</TipItem>
          <TipItem>Evite fotos muito escuras ou desfocadas</TipItem>
        </TipsList>
      </PhotoTipsSection>
    </>
  );
  
  // Renderização da etapa "Contato"
  const renderContatoStep = () => (
    <FormSection>
      <FormSectionTitle>Contato</FormSectionTitle>
      <FormSectionSubtitle>Essas informações serão mostradas para quem tiver interesse no seu imóvel.</FormSectionSubtitle>
      
      <InputGroup>
        <InputLabel>Nome completo</InputLabel>
        <TextInput 
          type="text"
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      
      <InputGroup>
        <InputLabel>Telefone</InputLabel>
        <TextInput 
          type="text"
          placeholder="Digite seu número no WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </InputGroup>
      
      <InputGroup>
        <InputLabel>E-mail</InputLabel>
        <TextInput 
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      
      <InputGroup>
        <InputLabel>Formas de contato</InputLabel>
        <FormSectionSubtitle>Diga como prefere ser contatado.</FormSectionSubtitle>
        
        <ContactOptionsGrid>
          <ContactOption 
            active={contactPreference === 'qualquer'}
            onClick={() => setContactPreference('qualquer')}
          >
            <ContactOptionIcon>📱</ContactOptionIcon>
            <ContactOptionText>Qualquer meio</ContactOptionText>
          </ContactOption>
          
          <ContactOption 
            active={contactPreference === 'telefone'}
            onClick={() => setContactPreference('telefone')}
          >
            <ContactOptionIcon>📞</ContactOptionIcon>
            <ContactOptionText>Apenas telefone</ContactOptionText>
          </ContactOption>
          
          <ContactOption 
            active={contactPreference === 'email'}
            onClick={() => setContactPreference('email')}
          >
            <ContactOptionIcon>✉️</ContactOptionIcon>
            <ContactOptionText>Apenas Email</ContactOptionText>
          </ContactOption>
        </ContactOptionsGrid>
      </InputGroup>
    </FormSection>
  );
  
  // Renderização do contador de etapas
  const renderStepCounter = () => {
    let step = 1;
    
    switch (currentStep) {
      case 'tipo':
        step = 1;
        break;
      case 'info':
        step = 2;
        break;
      case 'localizacao':
        step = 3;
        break;
      case 'fotos':
        step = 4;
        break;
      case 'contato':
        step = 5;
        break;
    }
    
    return `Passo ${step} de 5`;
  };
  
  // Renderização do botão "Continuar" ou "Finalizar"
  const renderActionButton = () => {
    if (currentStep === 'contato') {
      return (
        <FinalizeButton onClick={nextStep}>
          <span>Finalizar</span>
          →
        </FinalizeButton>
      );
    }
    
    return (
      <ContinueButton onClick={nextStep}>
        <span>Continuar</span>
        →
      </ContinueButton>
    );
  };
  
  return (
    <PageWrapper>
      <BackButtonWithAvatar>
        <BackButton to="/">
          ← Voltar
        </BackButton>
      </BackButtonWithAvatar>
      
      <PageTitle>Anúnciar Imóvel</PageTitle>
      <PageSubtitle>Vamos te ajudar a anunciar seu imóvel de forma simples e rápida</PageSubtitle>
      
      <StepsContainer>
        <StepConnector />
        
        <Step active={currentStep === 'tipo'}>
          <StepIcon active={currentStep === 'tipo'}>
            <i className="fas fa-home">🏠</i>
          </StepIcon>
          <StepLabel>Tipo do imóvel</StepLabel>
          <StepDescription>Escolha se é residencial ou comercial</StepDescription>
        </Step>
        
        <Step active={currentStep === 'info'}>
          <StepIcon active={currentStep === 'info'}>
            <i className="fas fa-info-circle">ℹ️</i>
          </StepIcon>
          <StepLabel>Informações básicas</StepLabel>
          <StepDescription>Escolha se é residencial ou comercial</StepDescription>
        </Step>
        
        <Step active={currentStep === 'localizacao'}>
          <StepIcon active={currentStep === 'localizacao'}>
            <i className="fas fa-map-marker-alt">📍</i>
          </StepIcon>
          <StepLabel>Localização</StepLabel>
          <StepDescription>Escolha se é residencial ou comercial</StepDescription>
        </Step>
        
        <Step active={currentStep === 'fotos'}>
          <StepIcon active={currentStep === 'fotos'}>
            <i className="fas fa-camera">📷</i>
          </StepIcon>
          <StepLabel>Fotos</StepLabel>
          <StepDescription>Escolha se é residencial ou comercial</StepDescription>
        </Step>
        
        <Step active={currentStep === 'contato'}>
          <StepIcon active={currentStep === 'contato'}>
            <i className="fas fa-user">👤</i>
          </StepIcon>
          <StepLabel>Contato</StepLabel>
          <StepDescription>Escolha se é residencial ou comercial</StepDescription>
        </Step>
      </StepsContainer>
      
      {renderStep()}
      
      <NavigationButtons>
        {currentStep !== 'tipo' ? (
          <BackButtonPlain onClick={previousStep}>
            ← Voltar
          </BackButtonPlain>
        ) : (
          <div></div> // Espaçador para manter o layout
        )}
        
        <StepCounter>{renderStepCounter()}</StepCounter>
        
        {renderActionButton()}
      </NavigationButtons>
    </PageWrapper>
  );
};

export default AnunciarImovelPage;