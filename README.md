# Receitas Food

Receitas Food e um projeto academico desenvolvido com React + Vite. A proposta e simular uma rede social gastronomica simples, onde usuarios podem visualizar receitas, publicar novas receitas no front-end, pesquisar preparos, filtrar por categoria e interagir com cards por meio de curtidas, salvamentos e comentarios.

## Objetivo Academico

O objetivo do projeto e praticar a criacao de interfaces modernas com React, organizacao de componentes, uso de estado com `useState`, renderizacao de listas, formularios controlados, filtros de dados e responsividade com CSS.

Nesta etapa, o foco esta no front-end da aplicacao. O login, a publicacao de receitas e as interacoes funcionam apenas localmente no navegador, sem banco de dados e sem autenticacao real.

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
- Tela de login separada da pagina inicial
- Feed de receitas com cards
- Lista inicial de receitas usando dados mockados
- Formulario para publicar receita no front-end
- Busca por nome da receita, autor e ingredientes
- Filtro por categoria
- Botao de curtir receita
- Botao de salvar receita
- Campo para adicionar comentarios em cada card
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

Para gerar a versao otimizada do projeto:

```bash
npm.cmd run build
```

## Verificacao de Codigo

Para executar a verificacao com ESLint:

```bash
npm.cmd run lint
```

## Observacoes Importantes

- O login ainda nao possui autenticacao real.
- As receitas publicadas sao armazenadas apenas no estado do React durante a execucao da pagina.
- Ao recarregar o navegador, os dados cadastrados no front-end sao perdidos.
- O projeto ainda nao possui back-end.
- O projeto ainda nao possui banco de dados.

## Proximas Melhorias Planejadas

- Criar uma API com Express.js
- Integrar banco de dados PostgreSQL ou EDB
- Implementar cadastro de usuarios
- Implementar autenticacao real
- Salvar receitas publicadas no banco de dados
- Salvar curtidas, receitas favoritas e comentarios
- Criar pagina de perfil do usuario
- Adicionar validacoes mais completas nos formularios

## Status do Projeto

Projeto em desenvolvimento para fins academicos, com foco atual no front-end e na organizacao visual da aplicacao.
