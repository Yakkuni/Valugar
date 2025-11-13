# Integração da API com o Frontend

Este documento descreve a integração completa entre o frontend React e a API REST do backend.

## 📁 Estrutura de Arquivos

```
src/
├── services/
│   ├── api.ts                 # Configuração do Axios e interceptors
│   ├── authServices.ts        # Serviços de autenticação e usuários
│   └── listingService.ts      # Serviços de anúncios/listings
├── hooks/
│   ├── useListings.ts         # Hook para gerenciar listings
│   └── useUsers.ts            # Hook para gerenciar usuários (admin)
├── types/
│   └── index.ts               # Tipos TypeScript compartilhados
└── context/
    └── AuthContext.tsx        # Contexto de autenticação
```

## 🔐 Autenticação

### Rotas Implementadas

#### POST /auth/login
```typescript
import { login } from '../services/authServices';

const response = await login(email, password);
// Retorna: { accessToken: string, refreshToken: string }
```

#### POST /auth/refresh-token
```typescript
import { refreshToken } from '../services/authServices';

const response = await refreshToken(refreshToken);
// Retorna: { accessToken: string, refreshToken: string }
```

#### POST /auth/user/register
```typescript
import { register } from '../services/authServices';

const response = await register(name, email, phone, password);
// Retorna: { id: string }
```

#### POST /auth/admin/register
```typescript
import { registerAdmin } from '../services/authServices';

const response = await registerAdmin(name, email, phone, password, creationCode);
// Retorna: { id: string }
```

#### DELETE /auth/user/:id
```typescript
import { deleteUser } from '../services/authServices';

await deleteUser(userId);
```

#### GET /auth/user
```typescript
import { getAllUsers } from '../services/authServices';

const users = await getAllUsers();
// Retorna: User[]
```

#### GET /auth/user/id/:id
```typescript
import { getUserById } from '../services/authServices';

const user = await getUserById(userId);
// Retorna: User
```

#### GET /auth/user/email/:email
```typescript
import { getUserByEmail } from '../services/authServices';

const user = await getUserByEmail(email);
// Retorna: User
```

## 🏠 Anúncios (Listings)

### Rotas Implementadas

#### POST /listing/register
```typescript
import { createListing } from '../services/listingService';

const listingData = {
  title: "Casa com 3 quartos",
  description: "Linda casa em ótima localização",
  type: "RENT", // ou "SALE"
  category: "RESIDENCIAL", // ou "COMERCIAL", "MISTO"
  basePrice: 2500.00,
  iptu: 150.00,
  userId: "user-id",
  address: {
    zipCode: "12345-678",
    state: "SP",
    city: "São Paulo",
    neighborhood: "Centro",
    street: "Rua das Flores, 123",
    reference: "Próximo ao mercado"
  },
  details: {
    area: "120",
    bedrooms: 3,
    bathrooms: 2
  }
};

const response = await createListing(listingData);
// Retorna: { id: string }
```

#### GET /listing/:id
```typescript
import { getListingById } from '../services/listingService';

const listing = await getListingById(listingId);
// Retorna: Listing
```

#### DELETE /listing/:id
```typescript
import { deleteListing } from '../services/listingService';

await deleteListing(listingId);
```

#### PUT /listing/:id
```typescript
import { updateListing } from '../services/listingService';

const response = await updateListing(listingId, updateData);
```

## 🎣 Hooks Customizados

### useListings

Hook para gerenciar operações de listings:

```typescript
import { useListings } from '../hooks/useListings';

function MyComponent() {
  const { loading, error, listing, create, remove, getById, update } = useListings();
  
  // Criar um anúncio
  const handleCreate = async () => {
    try {
      const response = await create(listingData);
      console.log('Anúncio criado:', response.id);
    } catch (err) {
      console.error('Erro:', error);
    }
  };
  
  // Buscar um anúncio
  const handleGet = async (id: string) => {
    try {
      const data = await getById(id);
      console.log('Anúncio:', data);
    } catch (err) {
      console.error('Erro:', error);
    }
  };
  
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
    </div>
  );
}
```

### useUsers

Hook para gerenciar operações de usuários (admin):

```typescript
import { useUsers } from '../hooks/useUsers';

function AdminPanel() {
  const { loading, error, users, getAll, remove, createAdmin } = useUsers();
  
  useEffect(() => {
    getAll();
  }, [getAll]);
  
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## 🔄 Interceptors

### Request Interceptor
Adiciona automaticamente o token de autenticação em todas as requisições:

```typescript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

### Response Interceptor
Lida com refresh token automaticamente quando recebe erro 401:

```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Tenta renovar o token
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('/auth/refresh-token', { refreshToken });
      
      // Salva os novos tokens
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      // Reenvia a requisição original
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

## 📝 Tipos TypeScript

Todos os tipos estão definidos em `src/types/index.ts`:

```typescript
// Usuário
interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
  isBlocked: boolean;
}

// Anúncio
interface Listing {
  id: string;
  title: string;
  description: string;
  type: 'SALE' | 'RENT';
  category: 'RESIDENCIAL' | 'COMERCIAL' | 'MISTO';
  basePrice: number;
  iptu: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  details: ListingDetails;
}
```

## 🎯 Exemplo de Uso Completo

### Página de Anunciar Imóvel

```typescript
import { useAuth } from '../context/AuthContext';
import { useListings } from '../hooks/useListings';

function AnunciarImovelPage() {
  const { user } = useAuth();
  const { create, loading } = useListings();
  
  const submitListing = async () => {
    if (!user) {
      alert('Você precisa estar logado');
      return;
    }
    
    const listingData = {
      title,
      description,
      type: 'RENT',
      category: 'RESIDENCIAL',
      basePrice: parseFloat(rent),
      iptu: parseFloat(iptu),
      userId: user.id,
      address: {
        zipCode,
        state,
        city,
        neighborhood,
        street,
        reference
      },
      details: {
        area,
        bedrooms,
        bathrooms
      }
    };
    
    try {
      const response = await create(listingData);
      navigate(`/property/${response.id}`);
    } catch (error) {
      alert('Erro ao criar anúncio');
    }
  };
  
  return (
    // ... JSX do formulário
  );
}
```

### Página de Detalhes do Imóvel

```typescript
import { useListings } from '../hooks/useListings';

function PropertyDetailPage() {
  const { id } = useParams();
  const { getById, listing, loading } = useListings();
  
  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id, getById]);
  
  if (loading) return <div>Carregando...</div>;
  if (!listing) return <div>Imóvel não encontrado</div>;
  
  return (
    <div>
      <h1>{listing.title}</h1>
      <p>R$ {listing.basePrice.toLocaleString('pt-BR')}</p>
      <p>{listing.description}</p>
    </div>
  );
}
```

## ⚙️ Configuração

### URL da API

Configure a URL base da API em `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:3000', // Altere para sua URL de produção
});
```

### Tokens

Os tokens são armazenados automaticamente no localStorage:
- `accessToken`: Token de acesso
- `refreshToken`: Token para renovação

## 🚀 Próximos Passos

- [ ] Implementar upload de imagens para listings
- [ ] Adicionar paginação na listagem de anúncios
- [ ] Implementar filtros de busca
- [ ] Adicionar funcionalidade de favoritos
- [ ] Implementar sistema de mensagens entre usuários

## 📚 Recursos

- [Documentação do Axios](https://axios-http.com/)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/)
