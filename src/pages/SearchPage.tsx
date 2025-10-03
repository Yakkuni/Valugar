import React, { useState } from 'react';
import styled from 'styled-components';
import { useProperties, Property } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  color: #0090C1;
  font-size: 30px;
  margin-bottom: 30px;
`;

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
`;

// Remove unused styled component

const FilterGroup = styled.div`
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
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const RangeContainer = styled.div`
  display: flex;
  gap: 10px;
  
  input {
    width: 50%;
  }
`;

const SearchButton = styled.button`
  background-color: #0090C1;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #007a9e;
  }
`;

const ResultsContainer = styled.div`
  padding: 0 10px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResultsCount = styled.p`
  font-size: 16px;
`;

const SortSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const SearchPage: React.FC = () => {
  const { searchProperties } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [sortOption, setSortOption] = useState('price_asc');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create filters object
    const filters = {
      type: propertyType || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined
    };
    
    // Call searchProperties from context
    const results = searchProperties(searchQuery, filters);
    
    // Sort results
    const sortedResults = sortResults(results, sortOption);
    
    setSearchResults(sortedResults);
    setIsInitialLoad(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setSearchResults(sortResults(searchResults, e.target.value));
  };

  const sortResults = (results: Property[], sortBy: string) => {
    const sorted = [...results];
    
    switch(sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'area_asc':
        return sorted.sort((a, b) => a.area - b.area);
      case 'area_desc':
        return sorted.sort((a, b) => b.area - a.area);
      default:
        return sorted;
    }
  };

  return (
    <PageContainer>
      <PageTitle>Buscar Imóveis</PageTitle>
      
      <SearchContainer>
        <FilterSidebar>
          <form onSubmit={handleSearch}>
            <FilterGroup>
              <Label>Busca por palavra-chave</Label>
              <Input 
                type="text" 
                placeholder="Ex: apartamento com varanda" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FilterGroup>
            
            <FilterGroup>
              <Label>Tipo de Imóvel</Label>
              <Select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="residential">Residencial</option>
                <option value="commercial">Comercial</option>
              </Select>
            </FilterGroup>
            
            <FilterGroup>
              <Label>Faixa de Preço</Label>
              <RangeContainer>
                <Input 
                  type="number" 
                  placeholder="Mínimo" 
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
                <Input 
                  type="number" 
                  placeholder="Máximo" 
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </RangeContainer>
            </FilterGroup>
            
            <SearchButton type="submit">Buscar</SearchButton>
          </form>
        </FilterSidebar>
        
        <ResultsContainer>
          {!isInitialLoad && (
            <>
              <ResultsHeader>
                <ResultsCount>
                  {searchResults.length} {searchResults.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                </ResultsCount>
                <div>
                  <Label style={{ display: 'inline' }}>Ordenar por: </Label>
                  <SortSelect value={sortOption} onChange={handleSortChange}>
                    <option value="price_asc">Menor preço</option>
                    <option value="price_desc">Maior preço</option>
                    <option value="area_asc">Menor área</option>
                    <option value="area_desc">Maior área</option>
                  </SortSelect>
                </div>
              </ResultsHeader>
              
              {searchResults.length > 0 ? (
                <PropertiesGrid>
                  {searchResults.map(property => {
                    // Adapt property to match PropertyCard props structure
                    const propertyCardData = {
                      id: property.id,
                      title: property.title,
                      location: `${property.address}, ${property.city}`,
                      price: property.price,
                      image: property.images && property.images.length > 0 ? property.images[0] : '/public/imagens/casa1.jpg',
                      bedrooms: property.bedrooms || 0,
                      bathrooms: property.bathrooms || 0,
                      area: property.area,
                      garages: 1 // Default value since it's not in our Property type
                    };
                    return <PropertyCard key={property.id} property={propertyCardData} />;
                  })}
                </PropertiesGrid>
              ) : (
                <NoResults>
                  Nenhum imóvel encontrado com os filtros selecionados.
                  <p>Tente modificar sua busca para obter resultados.</p>
                </NoResults>
              )}
            </>
          )}
          
          {isInitialLoad && (
            <NoResults>
              Use os filtros para encontrar imóveis.
            </NoResults>
          )}
        </ResultsContainer>
      </SearchContainer>
    </PageContainer>
  );
};

export default SearchPage;