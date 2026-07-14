# FINANCY - Sistema de Gestão de Finanças Pessoais

O **Financy** é uma aplicação completa de gerenciamento financeiro desenvolvida em uma arquitetura monorepo, permitindo que usuários gerenciem de forma ágil e segura suas receitas, despesas e categorias. O projeto utiliza as tecnologias mais robustas do mercado atual, como **React 19**, **Apollo Client**, **Node.js**, **Apollo Server 5**, **Prisma** e **SQLite**.

---

## 📁 Estrutura do Projeto

O repositório é organizado de forma modular utilizando uma estrutura de subpastas:

```text
financy/
├── backend/    # Servidor GraphQL, Prisma ORM e regras de negócio
└── frontend/   # Interface SPA construída com React e Vite

```

---

## 🚀 Tecnologias Utilizadas

### Back-end

* **Runtime**: Node.js com TypeScript
* **GraphQL Engine**: Apollo Server (Standalone)
* **ORM**: Prisma
* **Banco de Dados**: SQLite
* **Autenticação**: JSON Web Token (JWT) e criptografia com Bcrypt
* **Validação**: Zod

### Front-end

* **Bundler & Tooling**: Vite 8 sem meta-frameworks
* **Biblioteca Principal**: React 19
* **Estilização**: Tailwind CSS v4
* **Gerenciamento de Estado & GraphQL**: Apollo Client v4
* **Formulários**: React Hook Form integrado com validações Zod
* **Tipagem Estática**: TypeScript & GraphQL Codegen

---

## 🔧 Requisitos de Ambiente

Crie os respectivos arquivos `.env` nas subpastas com base nos arquivos `.env.example` inclusos no projeto:

### Configuração do Back-end (`/backend/.env`)

```env
JWT_SECRET="sua_chave_secreta_jwt_aqui"
DATABASE_URL="file:./dev.db"

```

### Configuração do Front-end (`/frontend/.env`)

```env
VITE_BACKEND_URL="http://localhost:4000"

```

---

## 🏃 Como Executar a Aplicação Localmente

Siga o passo a passo abaixo para rodar ambos os serviços:

### 1. Inicializando o Banco e o Servidor Back-end

Em um terminal, navegue até a pasta `backend`:

```bash
cd backend

```

Instale as dependências:

```bash
npm install

```

Execute as migrações do Prisma para criar o banco de dados SQLite local:

```bash
npx prisma migrate dev

```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev

```

O playground do Apollo Server estará acessível em: `http://localhost:4000`

---

### 2. Inicializando a Interface Front-end

Abra um novo terminal e acesse a pasta `frontend`:

```bash
cd frontend

```

Instale as dependências:

```bash
npm install

```

Gere as tipagens automáticas do GraphQL baseadas em suas queries e mutations:

```bash
npm run codegen

```

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev

```

A aplicação estará disponível em seu navegador em: `http://localhost:5173`

---

## 🧠 Principais Funcionalidades Implementadas

* **Cadastro e Login Únicos:** Login direto automatizado logo após o cadastro para melhor experiência de uso (UX).
* **Controle de Sessão Seguro:** Invalidação física do cache local do Apollo Client (`client.clearStore()`) ao efetuar Logout.
* **Dashboard Dinâmica:** Gráficos e painéis que exibem saldos, receitas e despesas agregadas do usuário conectado.
* **Componentes Customizados Reutilizáveis:** `UserAvatar` responsivo para renderização de iniciais e `Logo` em formato SVG unificado para identidade visual consistente.
* **Controle Total de Transações e Categorias:** Modais otimizados para criação, edição e remoção de registros em tempo real com reatividade direta via cache do Apollo Client.