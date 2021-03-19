# CHALLENGE ONE - IGNITE | INTRODUCTION NODEJS

## Methods and Parameters used

### Types of Parameters

- Route Params => Sempre que for necessário identificar um recurso editar/ deletar/ buscar

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



## Aplicações presentes no código


## Ações em Usuários

### Rotas
- [x] Criar conta de usuário.
- [x] Buscar lista dos usuários cadastrados.

### Regras de Negócio
- [x] Não pode ser criado um usuário com um username já utilizado.
- [x] Não realizar ações em um usuário inexistente.


## Ações em Todos

### Rotas
- [x] Criar todo para um usuário.
- [x] Buscar to-dos de um usuário. (1 ou + de 1)
- [x] Buscar um todo de um usuário. (1)
- [x] Edita um todo de um usuário.
- [x] Edita um elemento do todo de um usuário.
- [x] Excluir um todo.

### Regras de Negócio
- [x] Não realizar ações em um usuário inexistente.
- [x] Não realizar ações em um to-do inexistente.
