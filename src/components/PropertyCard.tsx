import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: white;
`;

const ImageContainer = styled.div`
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
`;

const CardContent = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px;
`;

const Location = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 10px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #0090C1;
  margin: 10px 0;
`;

const Features = styled.div`
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #666;
  margin: 10px 0;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ContactButton = styled(Link)`
  display: block;
  background: #0090C1;
  color: white;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-top: 15px;
`;

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    garages: number;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card>
      <ImageContainer>
        <img src={property.image} alt={property.title} />
      </ImageContainer>
      <CardContent>
        <Title>{property.title}</Title>
        <Location>{property.location}</Location>
        <Price>R${property.price.toLocaleString('pt-BR')},00</Price>
        <Features>
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 6a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H3z"/>
              <path d="M6.25 3.5a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75zm3.5 0a.75.75 0 0 0-.75.75v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 0-.75-.75z"/>
              <path d="M2.25 7.125a1.125 1.125 0 0 0-1.125 1.125v3.5A2.25 2.25 0 0 0 3.375 14h9.25a2.25 2.25 0 0 0 2.25-2.25v-3.5a1.125 1.125 0 0 0-1.125-1.125h-1V7a.5.5 0 0 0-.5-.5H3.75a.5.5 0 0 0-.5.5v.125h-1z"/>
            </svg>
            {property.bedrooms} Quartos
          </Feature>
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
              <path d="M2 5h12v2H2z"/>
              <path d="M3 14H2v-1h1v1zm4 0H6v-1h1v1zm4 0h-1v-1h1v1zm4 0h-1v-1h1v1z"/>
            </svg>
            {property.bathrooms} Banheiros
          </Feature>
        </Features>
        <Features>
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11z"/>
            </svg>
            {property.area}m²
          </Feature>
          <Feature>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
              <path d="M4.5 10.5A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Ver mais info
          </Feature>
        </Features>
        <ContactButton to={`/imovel/${property.id}`}>Solicitar Contato</ContactButton>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;