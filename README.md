# Star Wars Planets

Uma aplicação web moderna para explorar os planetas do universo Star Wars, desenvolvida como parte de um desafio técnico para vaga sênior.

## 🌟 Características

- **Interface moderna e responsiva** com tema escuro baseado no Linear
- **Busca em tempo real** com debounce para melhor performance
- **Paginação inteligente** para navegar entre os planetas
- **Detalhes completos** de cada planeta incluindo nativos, filmes e informações técnicas
- **Arquitetura escalável** com separação clara de responsabilidades
- **Tratamento robusto de erros** com feedback visual adequado
- **Loading states** com skeletons para melhor UX

## 🛠 Tecnologias Utilizadas

### Core
- **React 18** com TypeScript
- **Vite** como build tool
- **React Router DOM** para roteamento
- **React Query (TanStack Query)** para gerenciamento de estado servidor

### UI/Styling
- **Tailwind CSS v3** para estilização
- **shadcn/ui** como biblioteca de componentes base
- **Lucide React** para ícones
- **Radix UI** para componentes primitivos acessíveis

### Arquitetura
- **Hooks customizados** para lógica de negócio
- **Classes de serviço** para integração com APIs
- **TypeScript** com tipagem rigorosa
- **Estrutura modular** seguindo padrões de mercado

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── planet-card.tsx  # Card de planeta na listagem
│   ├── resident-card.tsx # Card de nativos
│   └── ...
├── hooks/               # Hooks customizados
│   ├── use-planets.ts   # Hook para listagem de planetas
│   ├── use-planet-details.ts # Hook para detalhes
│   └── use-search.ts    # Hook para busca com debounce
├── pages/               # Páginas da aplicação
│   ├── planets-list-page.tsx
│   └── planet-details-page.tsx
├── services/            # Camada de integração com APIs
│   └── swapi-service.ts # Serviço da SWAPI
├── types/               # Definições de tipos TypeScript
│   └── swapi.ts         # Tipos da SWAPI
├── lib/                 # Utilitários
│   └── utils.ts         # Helpers para classes CSS
└── utils/               # Utilitários gerais
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd star-wars-planets

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📋 Funcionalidades Implementadas

### ✅ Página de Listagem de Planetas
- [x] Lista todos os planetas da SWAPI
- [x] Ordenação alfabética por nome
- [x] Paginação com 10 itens por página
- [x] Busca por nome do planeta
- [x] Exibição de informações básicas (nome, terreno, diâmetro, clima)
- [x] Lista de filmes em que cada planeta aparece
- [x] Layout responsivo mobile-first

### ✅ Página de Detalhes do Planeta
- [x] Informações completas do planeta (rotação, orbitação, diâmetro, etc.)
- [x] Lista de nativos com detalhes (nome, cor dos olhos, cabelo, gênero)
- [x] Espécies de cada nativo
- [x] Veículos utilizados pelos nativos (nome e modelo)
- [x] Lista de filmes organizados por episódio
- [x] Navegação de volta para a listagem

### ✅ Funcionalidades Técnicas
- [x] Roteamento com React Router
- [x] Gerenciamento de estado com React Query
- [x] Cache inteligente com invalidação automática
- [x] Loading states com skeleton loaders
- [x] Tratamento de erros com mensagens amigáveis
- [x] Debounce na busca para otimização
- [x] Responsividade completa
- [x] Tema escuro moderno
- [x] TypeScript com tipagem rigorosa
- [x] Arquitetura escalável e modular

## 🎨 Design System

A aplicação utiliza um tema escuro moderno inspirado no Linear, com:
- **Cores primárias**: Roxo (#9333ea) para elementos de destaque
- **Background**: Tons escuros de cinza para conforto visual
- **Typography**: Hierarquia clara com contraste adequado
- **Componentes**: Baseados no shadcn/ui com customizações

## 🔧 Arquitetura

### Camada de Serviços
- **SwapiService**: Classe responsável por todas as chamadas à SWAPI
- **Tratamento de erros**: Custom error class com informações detalhadas
- **Cache**: Implementado via React Query com configurações otimizadas

### Hooks Customizados
- **usePlanets**: Gerencia listagem com paginação e busca
- **usePlanetDetails**: Carrega detalhes completos de um planeta
- **useSearch**: Implementa busca com debounce

### Tipagem
- Tipos completos para todas as entidades da SWAPI
- Tipos processados para otimizar a interface
- Validação rigorosa em tempo de compilação

## 🌐 API

A aplicação consome a [SWAPI (Star Wars API)](https://swapi.dev/) seguindo as boas práticas:
- Sem dependências de pacotes terceiros específicos para SWAPI
- Implementação própria de cache e otimizações
- Tratamento robusto de rate limiting e erros de rede

## 📱 Responsividade

Design mobile-first com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Todos os componentes se adaptam automaticamente ao tamanho da tela.

## 🧪 Qualidade de Código

- **TypeScript**: Configuração rigorosa com verificações adicionais
- **ESLint**: Regras de qualidade e consistência
- **Arquitetura modular**: Separação clara de responsabilidades
- **Convenções**: Nomes descritivos e estrutura consistente
- **Performance**: Otimizações com React Query e debounce

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.