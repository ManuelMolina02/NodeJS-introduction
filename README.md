# 🚀 Challenge One - Ignite | Node.js Concepts

## 🔭 Sobre o desafio
 Neste desafio desenvolvi a estrutura de rotas e middlewares presentes na aplicação onde a proposta é gerenciar tarefas.   Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*:
 
- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header). Para garantir que todas as etapas estão sendo cumpridas como proposto a Rocketseat já forneceu uma estrutura com os testes de validação implementados, onde cada participante deve criar as rotas com as regras de negócio aplicadas.


## ⚠ Validação de Requisitos:

### 📡 Testes de usuários

- *Should be able to create a new user*
- *Should not be able to create a new user when username already exists*

### 📡 Testes de *todos*
- *Should be able to list all user's todos*
- *Should be able to create a new todo*
- *Should be able to update a todo*
- *Should not be able to update a non existing todo*
- *Should be able to mark a todo as done*
- *Should not be able to mark a non existing todo as done*
- *Should be able to delete a todo*
- *Should not be able to delete a non existing todo*

## 🧰 Methods and Parameters used

### 🔧 Types of Parameters

- *Route Params* - Necessário para identificar um recurso editar/ deletar/ buscar

- *Query Params* - São utilizados em momentos de páginação, filtros 

- *Body Params* - Os objetos de inserção ou alteração (JSON)


### 🔩 Methods HTTP(REST API) of Activities

 - *GET* - Buscar informação dentro do servidor

 - *POST* - Inserir uma informação no servidor

 - *PUT* - Alterar uma informação no servidor

 - *PATCH* - Alterar uma informação específica

 - *DELETE* - Remover uma informação do servidor


### ⚙ Methods JavaScript of Activities

 - [find()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find) - [retorna dado do 1° elemento correspondente]
    - Demonstração:
          🔷  🔶  🔵  🔴  -  find(🔵) = 🔵
    
 - [some()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some) - [retorna booleano do 1° elemento correspondente]
    - Demonstração:
          🔷  🔶  🔵  🔴  -  some(🔵) = true

 - [filter()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) - [filtra o(s) elemento(s) correspondente(s)]
    - Demonstração:
          🔷  🔶  🔵  🔴  -  filter(🔵) = 🔵 🔴

- [splice()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) - [altera/ remove a posição do elemento correspondente]
    - Demonstração:
          🔷  🔶  🔵  🔴  -  splice(🔵,1) = 🔷 🔶 🔴


## 🤔 Como rodar o projeto?

- Faça um clone desse repositório;
- Acesse o local desejado através do terminal e digite: 
```sh
git clone https://github.com/ManuelMolina02/NodeJS-introduction-challenge-one.git
```
Após baixar o projeto, acesse ele via seu terminal rode os comandos:

```sh
yarn install
yarn dev
```
Ou se quiser rodar os testes de validação, via seu terminal rode o comando:
```sh
yarn test
```


Feito com 💜 por Manuel Molina 👋 Me contate através do [LinkedIn!](https://www.linkedin.com/in/manuel-angel-berger-molina-ba08b3174/)
