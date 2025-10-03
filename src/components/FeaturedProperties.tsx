import React from 'react';
import styled from 'styled-components';
import PropertyCard from './PropertyCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedProperties = () => {
  // Dados simulados de propriedades
  const properties = [
    {
      id: '1',
      title: 'Casa pra alugar',
      location: 'Tabuleiro do Norte',
      address: 'Rua Manoel Guerreiro, 4331, Joaquim Fernandes Colares',
      price: 680,
      image: '/imagens/casa1.jpg',
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      garages: 2
    },
    {
      id: '2',
      title: 'Casa pra alugar',
      location: 'Tabuleiro do Norte',
      address: 'Rua Manoel Guerreiro, 4331, Joaquim Fernandes Colares',
      price: 680,
      image: '/imagens/casa2.jpg',
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      garages: 2
    },
    {
      id: '3',
      title: 'Casa pra alugar',
      location: 'Tabuleiro do Norte',
      address: 'Rua Manoel Guerreiro, 4331, Joaquim Fernandes Colares',
      price: 680,
      image: '/imagens/casa3.jpg',
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      garages: 2
    },
    {
      id: '4',
      title: 'Ponto comercial no Centro',
      location: 'Tabuleiro do Norte',
      address: 'Rua Maia Alarcon, 201, Centro',
      price: 1780,
      image: '/imagens/casa4.jpg',
      bedrooms: 0,
      bathrooms: 1,
      area: 180,
      garages: 0
    }
  ];

  return (
    <Container>
      <PropertiesGrid>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </PropertiesGrid>
    </Container>
  );
};

export default FeaturedProperties;