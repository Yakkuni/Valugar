import { createContext, useState, useContext, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  type: 'residential' | 'commercial';
  status: 'for-rent' | 'for-sale';
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  featured?: boolean;
}

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  loading: boolean;
  error: string | null;
  getPropertyById: (id: string) => Property | undefined;
  searchProperties: (query: string, filters?: any) => Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

// Dados de exemplo para imóveis
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Espaçosa no Centro',
    description: 'Linda casa com 3 quartos, sala ampla, cozinha moderna e quintal em ótima localização.',
    price: 350000,
    address: 'Rua Principal, 123',
    city: 'Limoeiro do Norte',
    type: 'residential',
    status: 'for-sale',
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    images: ['/placeholder.jpg'],
    featured: true
  },
  {
    id: '2',
    title: 'Apartamento Mobiliado',
    description: 'Apartamento totalmente mobiliado com 2 quartos, sala, cozinha e varanda com vista para a cidade.',
    price: 1200,
    address: 'Av. Central, 456',
    city: 'Russas',
    type: 'residential',
    status: 'for-rent',
    area: 80,
    bedrooms: 2,
    bathrooms: 1,
    images: ['/placeholder.jpg'],
    featured: true
  },
  {
    id: '3',
    title: 'Sala Comercial no Centro',
    description: 'Excelente sala comercial com recepção, 2 ambientes e banheiro, pronta para seu negócio.',
    price: 250000,
    address: 'Rua do Comércio, 789',
    city: 'Limoeiro do Norte',
    type: 'commercial',
    status: 'for-sale',
    area: 60,
    images: ['/placeholder.jpg'],
    featured: false
  },
  {
    id: '4',
    title: 'Loja em Shopping',
    description: 'Loja com ótima localização em shopping movimentado, ideal para varejo.',
    price: 3500,
    address: 'Shopping Vale Center, Loja 42',
    city: 'Morada Nova',
    type: 'commercial',
    status: 'for-rent',
    area: 45,
    images: ['/placeholder.jpg'],
    featured: true
  },
  {
    id: '5',
    title: 'Casa com Piscina',
    description: 'Casa ampla com piscina, churrasqueira, 4 quartos sendo 2 suítes, ideal para família.',
    price: 450000,
    address: 'Rua das Palmeiras, 123',
    city: 'Russas',
    type: 'residential',
    status: 'for-sale',
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    images: ['/placeholder.jpg'],
    featured: true
  }
];

export const PropertyProvider = ({ children }: PropertyProviderProps) => {
  const [properties] = useState<Property[]>(mockProperties);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const featuredProperties = properties.filter(property => property.featured);

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const searchProperties = (query: string, filters?: any) => {
    let filteredProperties = [...properties];
    
    // Filtrar por texto
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(lowercaseQuery) ||
        property.description.toLowerCase().includes(lowercaseQuery) ||
        property.city.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Aplicar filtros adicionais se existirem
    if (filters) {
      if (filters.type) {
        filteredProperties = filteredProperties.filter(property => property.type === filters.type);
      }
      
      if (filters.status) {
        filteredProperties = filteredProperties.filter(property => property.status === filters.status);
      }
      
      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(property => property.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(property => property.price <= filters.maxPrice);
      }
      
      if (filters.city) {
        filteredProperties = filteredProperties.filter(property => property.city === filters.city);
      }
    }
    
    return filteredProperties;
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      featuredProperties,
      loading,
      error,
      getPropertyById,
      searchProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};