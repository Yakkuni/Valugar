# Valugar - Imóveis no Vale do Jaguaribe

Este é um projeto de uma plataforma imobiliária para o Vale do Jaguaribe, desenvolvido com React.

## Tecnologias Utilizadas

- React 18
- TypeScript
- React Router v6
- Styled Components
- Vite (build tool)

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Node.js (v16 ou superior)
- npm (v8 ou superior) ou yarn

## Instalação

Siga estes passos para configurar o projeto em sua máquina local:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/valugar.git
   cd valugar
   ```

2. Navegue para a pasta do projeto React:
   ```bash
   cd react-valugar
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Abra seu navegador e acesse:
   ```
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