# Valugar - Imóveis no Vale do Jaguaribe

Este é um projeto de uma plataforma imobiliária para o Vale do Jaguaribe, desenvolvido com React e integrado com uma API REST.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- React Router v6
- Styled Components
- Axios
- JWT Decode
- Vite (build tool)

### Backend
- API REST (necessária para funcionar)
- Autenticação JWT
- Endpoints documentados no Swagger

## 📋 Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v18 ou superior)
- **npm** (v8 ou superior) ou **yarn**
- **Backend rodando** na porta 3000

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Yakkuni/Valugar.git
cd Valugar
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (copie de `.env.example`):

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Para desenvolvimento com proxy (recomendado)
VITE_API_URL=/api

# Para desenvolvimento sem proxy (conectando diretamente ao backend)
# VITE_API_URL=http://localhost:3000

# Para produção
# VITE_API_URL=https://sua-api-producao.com
```

### 4. Inicie o backend

**IMPORTANTE:** O backend deve estar rodando antes de iniciar o frontend.

```bash
# Vá para a pasta do backend e inicie o servidor
cd ../backend
npm run start:dev
# O backend deve estar rodando em http://localhost:3000
```

### 5. Inicie o frontend

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em: **http://localhost:5173**

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── context/          # Contextos React (Auth, Theme, etc)
├── hooks/            # Hooks customizados (useListings, useUsers)
├── pages/            # Páginas da aplicação
├── routes/           # Configuração de rotas
├── services/         # Serviços de API (axios)
├── styles/           # Estilos globais e tema
├── types/            # Tipos TypeScript
└── utils/            # Funções utilitárias
```

## 🔌 Integração com a API

O frontend está totalmente integrado com a API REST. Consulte os seguintes arquivos para mais detalhes:

- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Guia completo de integração
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solução de problemas comuns

### Endpoints disponíveis:

#### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/refresh-token` - Renovar token
- `POST /auth/user/register` - Registrar usuário
- `POST /auth/admin/register` - Registrar admin
- `GET /auth/user` - Listar todos os usuários
- `GET /auth/user/id/:id` - Buscar usuário por ID
- `DELETE /auth/user/:id` - Deletar usuário

#### Anúncios
- `POST /listing/register` - Criar anúncio
- `GET /listing/:id` - Buscar anúncio por ID
- `PUT /listing/:id` - Atualizar anúncio
- `DELETE /listing/:id` - Deletar anúncio

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Lint
npm run lint
```

## 🐛 Problemas Comuns

### ❌ Erro: ERR_NETWORK

**Causa:** O frontend não consegue conectar ao backend.

**Solução:**
1. Verifique se o backend está rodando na porta 3000
2. Reinicie o servidor frontend: `npm run dev`
3. Consulte [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### ❌ Erro: 401 Unauthorized

**Causa:** Token expirado ou inválido.

**Solução:**
1. Faça login novamente
2. Limpe o localStorage: `localStorage.clear()`

### ❌ Erro: CORS

**Causa:** Backend não está aceitando requisições do frontend.

**Solução:**
1. Use o proxy do Vite (já configurado)
2. Configure CORS no backend
3. Veja exemplos em [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
   http://localhost:5173
   ```

## Estrutura do Projeto

```
src/
  ├── assets/       # Imagens, ícones e recursos estáticos
  ├── components/   # Componentes reutilizáveis
  ├── context/      # Contextos de estado global
  ├── hooks/        # Custom hooks
  ├── pages/        # Páginas/rotas da aplicação
  ├── styles/       # Estilos globais e temas
  ├── App.tsx       # Componente principal
  └── main.tsx      # Ponto de entrada da aplicação
```

## Funcionalidades Implementadas

- **Página Inicial**: Exibe imóveis em destaque e formulário de busca rápida
- **Autenticação**: Páginas de login e cadastro com validação de formulários
- **Listagem de Imóveis**: Página de busca com filtros por tipo, status e localização
- **Detalhes do Imóvel**: Visualização detalhada de cada imóvel

## Build para Produção

Para criar uma versão de produção otimizada:

```bash
npm run build
# ou
yarn build
```

Os arquivos de build serão gerados na pasta `dist/`.

## Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma versão de produção
- `npm run preview` - Visualiza a versão de produção localmente
- `npm run lint` - Executa o linter para verificar o código

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Nome - seunome@example.com