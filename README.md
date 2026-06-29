# Receitas Food

Receitas Food é um projeto acadêmico desenvolvido com React + Vite. A proposta é simular uma rede social gastronômica simples, onde usuários podem visualizar receitas, publicar novas receitas no front-end, pesquisar preparos, filtrar por categoria e interagir com cards por meio de curtidas, salvamentos e comentários.

## Objetivo Academico

O objetivo do projeto é praticar a criação de interfaces modernas com React, organização de componentes, uso de estado com `useState`, renderização de listas, formulários controlados, filtros de dados e responsividade com CSS.

Nesta etapa, o foco está no front-end da aplicação. O login, a publicação de receitas e as interações funcionam apenas localmente no navegador, sem banco de dados e sem autenticação real.

## Tecnologias Utilizadas

- React
- Vite
- JavaScript
- CSS
- React Icons
- ESLint

## Funcionalidades Implementadas

- Home com banner principal e chamada visual do projeto
- Header responsivo com links de navegacao
- Footer com newsletter simples
- Layout organizado envolvendo header, conteudo e footer
- Tela de login separada da página inicial
- Feed de receitas com cards
- Lista inicial de receitas usando dados mockados
- Formulario para publicar receita no front-end
- Busca por nome da receita, autor e ingredientes
- Filtro por categoria
- Botao de curtir receita
- Botao de salvar receita
- Campo para adicionar comentários em cada card
- Layout responsivo para telas grandes e dispositivos moveis

## Estrutura de Pastas

```txt
src/
├─ assets/
│  └─ imagens e arquivos visuais do projeto
│
├─ Components/
│  ├─ Layout/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  └─ Layout.jsx
│  │
│  ├─ Login/
│  │  ├─ Login.jsx
│  │  └─ Login.css
│  │
│  ├─ Pages/
│  │  ├─ HomePage.jsx
│  │  ├─ FeedPage.jsx
│  │  └─ ProfilePage.jsx
│  │
│  └─ Recipes/
│     ├─ RecipeCard.jsx
│     ├─ RecipeForm.jsx
│     ├─ RecipeList.jsx
│     ├─ RecipeFilter.jsx
│     ├─ recipesMock.js
│     └─ Recipes.css
│
├─ App.jsx
├─ App.css
├─ index.css
└─ main.jsx
```

## Como Instalar as Dependencias

No terminal, dentro da pasta do projeto, execute:

```bash
npm.cmd install
```

## Como Executar o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm.cmd run dev
```

Depois, acesse a URL exibida no terminal. Normalmente:

```txt
http://127.0.0.1:5173/
```

## Como Gerar o Build

Para gerar a versão otimizada do projeto:

```bash
npm.cmd run build
```

## Verificacao de Codigo

Para executar a verificacao com ESLint:

```bash
npm.cmd run lint
```

## Observacoes Importantes

- O login ainda não possui autenticação real.
- As receitas publicadas são armazenadas apenas no estado do React durante a execução da página.
- Ao recarregar o navegador, os dados cadastrados no front-end são perdidos.
- O projeto ainda não possui back-end.
- O projeto ainda não possui banco de dados.

## Proximas Melhorias Planejadas

- Criar uma API com Express.js
- Integrar banco de dados PostgreSQL ou EDB
- Implementar cadastro de usuários
- Implementar autenticação real
- Salvar receitas publicadas no banco de dados
- Salvar curtidas, receitas favoritas e comentários
- Criar página de perfil do usuário
- Adicionar validações mais completas nos formulários

## Status do Projeto

Projeto em desenvolvimento para fins acadêmicos, com foco atual no front-end e na organização visual da aplicação.
