# CHALLENGE ONE - IGNITE | Node.js Concepts

## 💻 Sobre o desafio

Nesse desafio, será desenvolvida uma aplicação para gerenciar tarefas. Será permitida a criação de um usuário com `name` e `username`, bem como fazer o CRUD de *todos*:

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header).


### Testes de usuários

- **Should be able to create a new user**
- **Should not be able to create a new user when username already exists**

### Testes de *todos*
- **Should be able to list all user's todos**
- **Should be able to create a new todo**
- **Should be able to update a todo**
- **Should not be able to update a non existing todo**
- **Should be able to mark a todo as done**
- **Should not be able to mark a non existing todo as done**
- **Should be able to delete a todo**
- **Should not be able to delete a non existing todo**

## Methods and Parameters used

### Types of Parameters

- Route Params => Necessário para identificar um recurso editar/ deletar/ buscar

- Query Params => são utilizados em momentos de páginação, filtros 

- Body Params => Os objetos de inserção ou alteração (JSON)


### Methods HTTP(REST API) of Activities

 - GET - Buscar informação dentro do servidor

 - POST - Inserir uma informação no servidor

 - PUT - Alterar uma informação no servidor

 - PATCH - Alterar uma informação específica

 - DELETE - Remover uma informação do servidor


### Methods JavaScript of Activities

 - find() - [retorna dado(s) do(s) elemento(s) correspondente(s)]
    - Demonstração:
    [X],[X],[O],[X] find(O) = [O]

 - some() - [retorna booleano do(s) elemento(s) correspondente(s)]
    - Demonstração:
    [X],[X],[O],[X] some(O) = true

 - filter() - [filtra o(s) elemento(s) correspondente(s)]
    - Demonstração:
    [X],[X],[O],[O] filter(O) = [O],[O]

- splice() - [exclui o(s) elemento(s) correspondente(s)]
    - Demonstração:
    [X],[X],[O.p1],[O.p2] splice(O,1) =  [X],[X],[O.p2]

      * Neste exemplo 'p' representa posição, que é um argumento esperado pelo splice

Feito com 💜 por Manuel Molina 👋 Me contate através do [LinkedIn!](https://www.linkedin.com/in/manuel-angel-berger-molina-ba08b3174/)