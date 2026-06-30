# Receitas Food

**Receitas Food** é um projeto acadêmico de aplicação web desenvolvido com **React + Vite**, **Node.js**, **Express.js** e **PostgreSQL/EDB**.

A proposta do sistema é simular uma rede social gastronômica, onde usuários podem criar conta, fazer login, visualizar receitas, publicar novas receitas, enviar imagens, acessar detalhes de cada preparo, editar informações da própria conta e interagir com conteúdos gastronômicos.

O projeto foi desenvolvido com foco acadêmico, demonstrando a integração entre front-end, back-end, banco de dados e versionamento de código.

---

## Objetivo Acadêmico

O objetivo do projeto é praticar conceitos de desenvolvimento web moderno, incluindo:

* Criação de interfaces com React;
* Organização de componentes;
* Controle de estado com `useState` e `useEffect`;
* Consumo de API com Fetch API/AJAX;
* Criação de API REST com Express.js;
* Integração com banco de dados PostgreSQL/EDB;
* Validação de formulários;
* Upload de imagens;
* Versionamento com Git e GitHub;
* Estruturação de uma aplicação web completa.

---

## Tecnologias Utilizadas

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Icons
* Node.js
* Express.js
* PostgreSQL/EDB
* pgAdmin
* Fetch API/AJAX
* Git e GitHub
* ESLint

---

## Funcionalidades Implementadas

* Home com banner principal;
* Header com navegação;
* Footer com links funcionais e newsletter visual;
* Feed de receitas carregado pela API;
* Receitas armazenadas no PostgreSQL;
* Tela de detalhes da receita;
* Cadastro de usuário com validação no back-end;
* Login consultando usuário no banco de dados;
* Recuperação de senha simulada;
* Área “Minha conta”;
* Atualização de dados do perfil;
* Troca de foto/avatar do usuário;
* Upload de imagem de receita;
* Publicação de novas receitas;
* Exclusão de receita apenas pelo autor;
* Controle básico de usuário logado no front-end;
* Integração entre React, Express e PostgreSQL;
* Fallback em memória caso o banco não esteja disponível.

---

## Estrutura de Pastas

```txt
Receitas Food/
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
│
├─ src/
│  ├─ assets/
│  │  └─ imagens e arquivos visuais
│  │
│  ├─ Components/
│  │  ├─ Account/
│  │  │  ├─ AccountPage.jsx
│  │  │  ├─ AccountProfile.jsx
│  │  │  ├─ AccountSettings.jsx
│  │  │  ├─ AccountStats.jsx
│  │  │  └─ Account.css
│  │  │
│  │  ├─ Auth/
│  │  │  ├─ AuthPage.jsx
│  │  │  ├─ LoginForm.jsx
│  │  │  ├─ RegisterForm.jsx
│  │  │  ├─ ForgotPasswordForm.jsx
│  │  │  ├─ LoginTransition.jsx
│  │  │  └─ Auth.css
│  │  │
│  │  ├─ Layout/
│  │  │  ├─ Header.jsx
│  │  │  ├─ Footer.jsx
│  │  │  └─ Layout.jsx
│  │  │
│  │  ├─ Pages/
│  │  │  ├─ HomePage.jsx
│  │  │  ├─ FeedPage.jsx
│  │  │  ├─ CreateRecipePage.jsx
│  │  │  ├─ RecipeDetailsPage.jsx
│  │  │  └─ ProfilePage.jsx
│  │  │
│  │  └─ Recipes/
│  │     ├─ RecipeCard.jsx
│  │     ├─ RecipeList.jsx
│  │     ├─ RecipeFilter.jsx
│  │     ├─ recipesMock.js
│  │     └─ Recipes.css
│  │
│  ├─ services/
│  │  ├─ api.js
│  │  ├─ authApi.js
│  │  └─ userApi.js
│  │
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
│
├─ server/
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  ├─ recipes.controller.js
│  │  └─ users.controller.js
│  │
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  ├─ recipes.routes.js
│  │  ├─ uploads.routes.js
│  │  └─ users.routes.js
│  │
│  ├─ data/
│  │  ├─ recipes.data.js
│  │  └─ users.data.js
│  │
│  ├─ sql/
│  │  ├─ schema.sql
│  │  └─ seed.sql
│  │
│  ├─ uploads/
│  │  └─ .gitkeep
│  │
│  ├─ db.js
│  ├─ server.js
│  ├─ .env.example
│  └─ .env
│
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ README.md
└─ vite.config.js
```

---

## Como Instalar as Dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm.cmd install
```

---

## Como Executar o Front-end

Para iniciar o React com Vite:

```bash
npm.cmd run dev
```

Depois acesse no navegador:

```txt
http://localhost:5173/
```

---

## Como Executar o Back-end

Para iniciar a API Express:

```bash
npm.cmd run server:dev
```

A API será executada em:

```txt
http://localhost:3333/
```

Rotas principais para teste:

```txt
http://localhost:3333/api/health
http://localhost:3333/api/recipes
```

---

## Como Gerar o Build

Para gerar a versão otimizada do projeto:

```bash
npm.cmd run build
```

---

## Verificação de Código

Para executar o ESLint:

```bash
npm.cmd run lint
```

---

## Configuração do PostgreSQL/EDB

Crie um banco de dados chamado:

```txt
receitas_food
```

Depois crie um arquivo `.env` dentro da pasta `server/`, usando como base o arquivo `server/.env.example`.

Exemplo:

```env
PORT=3333
DATABASE_URL=postgres://postgres:sua_senha@localhost:5432/receitas_food
```

Em seguida, execute os arquivos SQL no pgAdmin ou pelo terminal.

Criar tabelas:

```bash
psql -U postgres -d receitas_food -f server/sql/schema.sql
```

Inserir dados iniciais:

```bash
psql -U postgres -d receitas_food -f server/sql/seed.sql
```

Também é possível copiar o conteúdo de `schema.sql` e `seed.sql` e executar diretamente no **Query Tool** do pgAdmin.

---

## Banco de Dados

O projeto utiliza o banco `receitas_food` com as principais tabelas:

* `users`
* `recipes`
* `comments`
* `likes`
* `saved_recipes`

A tabela `users` armazena informações dos usuários, como nome, username, email, biografia, avatar e senha em hash.

A tabela `recipes` armazena as receitas publicadas e identifica o usuário autor por meio do campo `user_id`.

---

## Autenticação

O sistema possui cadastro e login integrados ao PostgreSQL.

O cadastro cria usuários reais no banco de dados.
O login consulta o usuário pelo email e compara a senha informada com o hash salvo no banco.

Para fins acadêmicos, foi utilizado hash SHA-256 com o módulo nativo `crypto` do Node.js. O projeto ainda não utiliza JWT ou controle avançado de sessão.

Usuários de teste criados pelo seed:

```txt
Email: demo@receitasfood.com
Senha: 123456
```

```txt
Email: ana@receitasfood.com
Senha: 123456
```

---

## Upload de Imagens

O sistema permite upload de imagens para receitas e perfil do usuário.

As imagens são salvas localmente na pasta:

```txt
server/uploads/
```

O Express disponibiliza esses arquivos pela rota:

```txt
http://localhost:3333/uploads/
```

A pasta `uploads` é ignorada no GitHub para evitar o envio de imagens reais ao repositório.

---

## Rotas da API

### Saúde da API

```txt
GET /api/health
```

### Receitas

```txt
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PUT /api/recipes/:id
DELETE /api/recipes/:id
```

### Autenticação

```txt
POST /api/auth/login
POST /api/auth/register
POST /api/auth/recover-password
```

### Usuários

```txt
GET /api/users/:id
PUT /api/users/:id
PATCH /api/users/:id/password
```

### Upload

```txt
POST /api/uploads
```

---

## Observações Importantes

* O projeto foi desenvolvido para fins acadêmicos.
* O sistema já possui integração com PostgreSQL.
* O login e cadastro usam o banco de dados.
* O controle de sessão ainda é local no front-end.
* O projeto ainda não utiliza JWT.
* O upload de imagens é salvo localmente em `server/uploads/`.
* Algumas interações sociais ainda podem ser expandidas futuramente, como curtidas persistentes, comentários completos e receitas favoritas.

---

## Próximas Melhorias Planejadas

* Implementar autenticação com JWT;
* Melhorar controle de sessão;
* Salvar curtidas no banco em tempo real;
* Salvar comentários no banco em tempo real;
* Criar sistema de seguidores;
* Criar página pública de perfil do usuário;
* Adicionar paginação no feed;
* Publicar o projeto em ambiente online;
* Melhorar tratamento de erros;
* Melhorar segurança da autenticação com bcrypt.

---

## Link do GitHub

```txt
https://github.com/LucasOMayer/Projeto-Receitas
```

---

## Status do Projeto

Projeto acadêmico em estágio funcional, com front-end, back-end, banco de dados, autenticação básica, upload de imagens e integração entre React, Express e PostgreSQL.
