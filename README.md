# Finances API

API RESTful para gerenciamento de transações financeiras, desenvolvida com **Node.js**, **TypeScript**, **Prisma** e autenticação JWT. O projeto inclui funcionalidades como cadastro de usuários, categorias e transações, além de documentação interativa com Swagger.

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Gerenciamento de categorias
- CRUD de transações financeiras
- Proteção de rotas com autenticação JWT
- Documentação interativa com Swagger
- Testes automatizados com Jest e Supertest

---

## Tecnologias

- **Node.js** e **Express** para o back-end
- **TypeScript** para tipagem estática
- **Prisma ORM** para manipulação do banco de dados MySQL
- **JWT** para autenticação
- **Zod** para validação de dados
- **Swagger** para documentação da API
- **Jest** e **Supertest** para testes

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- MySQL
- Docker (opcional)

### Configuração

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/finance-api.git
   cd finance-api
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DATABASE_URL=mysql://root:senha@localhost:3306/financesdb
   JWT_SECRET=sua-chave-secreta
   ```

4. Rode as migrations do Prisma:
   ```sh
   npx prisma migrate deploy
   ```

### Executando o Projeto

- **Modo de Desenvolvimento**:
  ```sh
  npm run dev
  ```

- **Modo de Produção**:
  ```sh
  npm run build
  npm start
  ```

### Usando Docker

1. Suba os serviços com Docker Compose:
   ```sh
   docker-compose up
   ```

2. Acesse a API em `http://localhost:3333`.

---

## Documentação da API

Acesse a documentação interativa do Swagger em:  
[http://localhost:3333/api-docs](http://localhost:3333/api-docs)

---

## Testes

Execute os testes automatizados com:
```sh
npm test
```

---

## Estrutura do Projeto

```
src/
├── config/            # Configurações (ex.: JWT)
├── controllers/       # Controladores das rotas
├── docs-swagger/      # Configuração do Swagger
├── lib/               # Configurações de bibliotecas (ex.: Prisma)
├── middlewares/       # Middlewares (ex.: autenticação)
├── prisma/            # Arquivos do Prisma (schema e migrations)
├── routes/            # Definição das rotas
├── schemas/           # Schemas de validação com Zod
├── services/          # Lógica de negócios
├── tests/             # Testes automatizados
└── utils/             # Funções utilitárias
```

---

## Segurança

- Hash de senhas com **bcrypt**
- Autenticação via **JWT**
- Validação de dados com **Zod**

---

## Melhorias Futuras

- Relatórios financeiros
- Internacionalização (i18n)
- Recuperação de senha
- Integração com serviços externos (ex.: bancos)

---

> Projeto desenvolvido para fins de estudo e demonstração de boas práticas no desenvolvimento de APIs modernas.