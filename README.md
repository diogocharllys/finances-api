<h1 align="center">Finances API</h1>

<p align="center">
  API REST para controle financeiro pessoal — usuários, categorias e transações — com autenticação JWT e documentação Swagger.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white" alt="Node"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License"/>
</p>

---

## 📑 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Modelo de dados](#-modelo-de-dados)
- [Endpoints](#-endpoints)
- [Como rodar](#-como-rodar)
- [Testes](#-testes)
- [O que aprendi](#-o-que-aprendi)
- [Melhorias futuras](#-melhorias-futuras)

---

## 📋 Sobre

API para registo de finanças pessoais: o usuário organiza as suas **transações** (receitas/despesas) por **categorias**. Construída como estudo de uma API REST em camadas, com autenticação JWT e tratamento centralizado de erros.

---

## ✨ Funcionalidades

- 🔐 Cadastro e autenticação de usuários
- 🏷️ Gestão de categorias
- 💸 CRUD de transações financeiras
- 🛡️ Proteção de rotas com JWT
- 📖 Documentação interativa com Swagger

---

## 🛠️ Stack

| Camada | Tecnologias |
|--------|-------------|
| Runtime / Linguagem | Node.js 20+, TypeScript |
| Web | Express |
| Banco de dados | MySQL via Prisma ORM |
| Autenticação | JWT + bcrypt |
| Validação | Zod |
| Documentação | Swagger |
| Testes | Jest + Supertest |
| Infra | Docker / Docker Compose |

---

## 🏗️ Arquitetura

Organização em **camadas** com responsabilidades separadas:

```
src/
├── config/            # Configurações (ex.: JWT)
├── controllers/       # Recebem a requisição e orquestram a resposta
├── services/          # Lógica de negócio
├── routes/            # Definição e composição das rotas
├── schemas/           # Validação de entrada com Zod
├── middlewares/       # Autenticação e tratamento de erros
├── lib/               # Clientes de bibliotecas (ex.: Prisma)
├── prisma/            # Schema e migrations
├── utils/             # Funções utilitárias (ex.: asyncHandler)
└── tests/             # Testes automatizados
```

As rotas protegidas usam um middleware `authenticate`, e os erros são tratados por um **error handler central** combinado com um `asyncHandler` que captura rejeições assíncronas.

---

## 🗃️ Modelo de dados

`User` · `Category` · `Transaction`

Cada transação pertence a um usuário e a uma categoria, permitindo agrupar e analisar receitas e despesas.

---

## 🔌 Endpoints

> Base URL local: `http://localhost:3333` · Auth via header `Authorization: Bearer <token>`

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Cadastra um usuário |
| `POST` | `/auth/login` | Login e retorno do JWT |

### Categorias *(requer auth)*
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/categories` | Cria categoria |
| `GET` | `/categories` | Lista categorias |
| `PUT` | `/categories/:id` | Atualiza categoria |
| `DELETE` | `/categories/:id` | Remove categoria |

### Transações *(requer auth)*
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/transactions` | Cria transação |
| `GET` | `/transactions` | Lista transações |
| `GET` | `/transactions/:id` | Detalha transação |
| `PUT` | `/transactions/:id` | Atualiza transação |
| `DELETE` | `/transactions/:id` | Remove transação |

> 📖 Especificação interativa completa no Swagger em **`/api-docs`**.

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 20+
- MySQL (ou Docker)

### Local
```sh
git clone https://github.com/diogocharllys/finances-api.git
cd finances-api
npm install

# Configure o .env:
#   DATABASE_URL="mysql://root:senha@localhost:3306/financesdb"
#   JWT_SECRET="sua-chave-secreta"
npx prisma migrate deploy

npm run dev
```

### Com Docker
```sh
docker-compose up
```

API em `http://localhost:3333` · docs em `http://localhost:3333/api-docs`.

### Scripts
| Comando | Ação |
|---------|------|
| `npm run dev` | Desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm test` | Roda os testes (Jest) |

---

## 🧪 Testes

```sh
npm test
```

Testes com **Jest + Supertest** cobrindo rotas e regras de negócio.

---

## 📚 O que aprendi

- Estruturar uma API REST **em camadas** (controller → service → dados) com responsabilidades claras.
- Centralizar o **tratamento de erros** com um error handler e um `asyncHandler` para rotas assíncronas.
- Proteger recursos com **middleware de autenticação JWT**.
- Validar entradas com **Zod** e documentar a API com **Swagger**.

---

## 🔭 Melhorias futuras

- [ ] Relatórios financeiros (somatórios por categoria/período)
- [ ] Recuperação de senha
- [ ] Internacionalização (i18n)
- [ ] Pipeline de CI (lint + testes no GitHub Actions)

---

<p align="center">
  <sub>Projeto de estudo e demonstração de boas práticas em APIs Node.js + TypeScript · <a href="https://github.com/diogocharllys">@diogocharllys</a></sub>
</p>
