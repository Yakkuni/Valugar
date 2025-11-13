import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useListings } from '../hooks/useListings';
import { Listing } from '../types';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #0090C1;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const PropertyNotFound = styled.div`
  text-align: center;
  padding: 60px 0;
  
  h2 {
    color: #0090C1;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
  }
  
  a {
    display: inline-block;
    background: #0090C1;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      background: #007a9e;
    }
  }
`;

const PropertyContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const PropertyGallery = styled.div``;

const MainImage = styled.div`
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  height: 400px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Thumbnail = styled.div<{ active?: boolean }>`
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: ${props => props.active ? '2px solid #0090C1' : '2px solid transparent'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Remove unused styled component

const PropertyTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 5px;
  color: #333;
`;

const PropertyLocation = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const PropertyPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0090C1;
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #666;
  
  svg {
    color: #0090C1;
  }
`;

const PropertyDescription = styled.div`
  margin-bottom: 30px;
  
  h2 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #333;
  }
  
  p {
    line-height: 1.6;
    color: #555;
  }
`;

const ContactCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  position: sticky;
  top: 20px;
`;

const ContactTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

const ContactForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background-color: #0090C1;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #007a9e;
  }
`;

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getById, listing, loading: loadingListing } = useListings();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          await getById(id);
        } catch (error) {
          console.error('Erro ao buscar imóvel:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchProperty();
  }, [id, getById]);
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Here you would normally send the data to your backend
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          Carregando informações do imóvel...
        </div>
      </PageContainer>
    );
  }
  
  if (loading || loadingListing) {
    return (
      <PageContainer>
        <div>Carregando...</div>
      </PageContainer>
    );
  }
  
  if (!listing) {
    return (
      <PageContainer>
        <PropertyNotFound>
          <h2>Imóvel não encontrado</h2>
          <p>O imóvel que você está procurando não está disponível ou foi removido.</p>
          <Link to="/buscar">Ver todos os imóveis</Link>
        </PropertyNotFound>
      </PageContainer>
    );
  }
  
  // Create property location from address
  const location = `${listing.address.street}, ${listing.address.neighborhood} - ${listing.address.city}, ${listing.address.state}`;
  
  // If there's no images, create a placeholder
  const images = ['/public/imagens/casa1.jpg', '/public/imagens/casa2.jpg', '/public/imagens/casa3.jpg', '/public/imagens/casa4.jpg'];
  
  return (
    <PageContainer>
      <BackLink to="/buscar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        Voltar para busca
      </BackLink>
      
      <PropertyContainer>
        <PropertyGallery>
          <MainImage>
            <img src={images[activeImage]} alt={listing.title} />
          </MainImage>
          
          <ThumbnailGrid>
            {images.slice(0, 4).map((image: string, index: number) => (
              <Thumbnail 
                key={index} 
                active={activeImage === index}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${listing.title} - Imagem ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailGrid>
        </PropertyGallery>
        
        <ContactCard>
          <ContactTitle>Interessado neste imóvel?</ContactTitle>
          <ContactForm onSubmit={handleContactSubmit}>
            <FormGroup>
              <Label htmlFor="name">Seu nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                required
                placeholder="Olá, tenho interesse neste imóvel e gostaria de mais informações."
              />
            </FormGroup>
            
            <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
          </ContactForm>
        </ContactCard>
      </PropertyContainer>
      
      <div style={{ marginTop: '30px' }}>
        <PropertyTitle>{listing.title}</PropertyTitle>
        <PropertyLocation>{location}</PropertyLocation>
        <PropertyPrice>
          {listing.type === 'SALE' ? 'R$ ' : 'R$ '} 
          {listing.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          {listing.type === 'RENT' ? '/mês' : ''}
        </PropertyPrice>
        
        <FeaturesGrid>
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11z"/>
            </svg>
            <span>{listing.details.area} m²</span>
          </Feature>
          
          {listing.details.bedrooms > 0 && (
            <Feature>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3 6a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H3z"/>
                <path d="M6.25 3.5a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75zm3.5 0a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75z"/>
                <path d="M2.25 7.125a1.125 1.125 0 0 0-1.125 1.125v3.5A2.25 2.25 0 0 0 3.375 14h9.25a2.25 2.25 0 0 0 2.25-2.25v-3.5a1.125 1.125 0 0 0-1.125-1.125h-1V7a.5.5 0 0 0-.5-.5H3.75a.5.5 0 0 0-.5.5v.125h-1z"/>
              </svg>
              <span>{listing.details.bedrooms} {listing.details.bedrooms === 1 ? 'Quarto' : 'Quartos'}</span>
            </Feature>
          )}
          
          {listing.details.bathrooms > 0 && (
            <Feature>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                <path d="M2 5h12v2H2z"/>
                <path d="M3 14H2v-1h1v1zm4 0H6v-1h1v1zm4 0h-1v-1h1v1zm4 0h-1v-1h1v1z"/>
              </svg>
              <span>{listing.details.bathrooms} {listing.details.bathrooms === 1 ? 'Banheiro' : 'Banheiros'}</span>
            </Feature>
          )}
          
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            <span>{listing.category}</span>
          </Feature>
        </FeaturesGrid>
        
        <PropertyDescription>
          <h2>Descrição</h2>
          <p>{listing.description}</p>
        </PropertyDescription>
      </div>
    </PageContainer>
  );
};

export default PropertyDetailPage;