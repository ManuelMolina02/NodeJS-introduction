const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

//Users = Tabela de Usuários
const users = [
  {
    "name": "Tiago",
    "username": "hxcxtiago",
    "id": "18c34864-e468-4c97-abdc-e0bc8f7247bc",
    "todos": [
      {
        "id": "00827531-b416-42ab-bc54-06db50d8dd95",
        "title": "comprar pc",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:16.564Z"
      }
    ]
  },
  {
    "name": "Manuelso",
    "username": "hxcxmanu",
    "id": "5f2d5a20-dc42-4c6d-a211-daabbbbf4463",
    "todos": [
      {
        "id": "f1d1911c-3b09-4d70-8943-188207302a1b",
        "title": "arrumar carro",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:29.818Z"
      },
      {
        "id": "a20a35e7-ad56-4367-99c1-1fb36fa26fb5",
        "title": "pintar casa",
        "done": false,
        "deadline": "2021-03-15T00:00:00.000Z",
        "createdAt": "2021-03-15T10:32:33.666Z"
      }
    ]
  }
];


// ------------> MIDDLEWARE <------------

// Validar se 'ACCOUNT' de usuário existe
function checksExistsUserAccount(req, res, next) {
  //armazenar 'username' que vem do headers
  const { username } = req.headers;
  // console.log("Console do username inserido no 'req.headers' que chega em checksExistsUserAccount: ", username);


  // find: no array 'users' faça uma busca de 'username' onde será verificado se o 'username' inserido no 'req.headers' corresponde a algum já cadastrado
  const user = users.find(user => user.username === username);

  // console.log("Console do 'user' retorna objeto que corresponde validação do 'find' em checksExistsUserAccount: ", user);


  //se 'username' não tiver correspondência retorne um erro, se não continue a ação
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  //se o 'username' já existe, armazene as informações deste usuário
  req.user = user;

  return next();
}

// Validar se 'TODO' de usuário existe
function checksExistsTodo(req, res, next) {
  // objeto dos dados de usuário
  const { user } = req;
  // console.log("Retorna dados de usuário checado no middleware anterior: ", user);

  // capturar id do 'req.params'
  const { id } = req.params;
  // console.log("Retorna ID do TODO inserido no 'req.params' :", id);

  // find: no array 'users/todos' faça uma busca do 'todo' onde será verificado se o ID do 'todo' inserido no 'req.params' corresponde a algum já cadastrado.
  const todo = user.todos.find((todo => todo.id === id));
  //console.log("Retorna objeto do 'TODO' que corresponde ao ID no 'req.params': ", todo);


  //se 'todo' não tiver correspondência retorne um erro, se não continue a ação
  if (!todo) {
    return res.status(404).json({ error: "Todo not exists!" })
  }

  return next();

}





// -------------------->> ROTAS || ROUTES <-------------------->


// ----->>  USUÁRIOS || USERS <<-----

//Criar uma conta de usuário // Validar se conta já existe
app.post('/users', (req, res) => {
  //Capturar dados do req.body
  const { name, username } = req.body;
  //validar se username já existe

  // some: para cada elemento no array 'users', faça um 'user'.
  //       me retorne o [booleano] onde o valor da tabela users.username corresponda ao input('username') no req.body
  const userAlreadyExists = users.some(
    (user) => user.username === username
  );

  //se o retorno de usuário existente for verdadeiro execute: (se não continue executanto)
  if (userAlreadyExists) {
    return res.status(400).json({ error: 'Username already exists!' })
  }

  //na tabela user insira:
  users.push({
    name,
    username,
    id: uuidv4(),
    todos: [],
  })

  const user = users.find(user => user.username === username);
  return res.json(user).status(201);
});

//Buscar lista dos usuários cadastrados
app.get('/users', (req, res) => {
  //mostre no console a tabela 'users'
  console.log(users)
  //retorne na rota a tabela 'users'
  return res.json(users);
});

//Buscar to-dos de um usuários cadastrado // Validar se conta já existe
app.get('/users', checksExistsUserAccount, (req, res) => {
  // find: para cada elemento no array 'users', faça um 'user'.
  //       me retorne os [dados] onde o valor da tabela users.username corresponda ao input('username') no req.body
  const user = users.find(user => user.username === username);

  return res.json(user);
});



// ----->>  ATIVIDADES || TO-DOS <<-----



//Buscar to-dos de um usuário
app.get('/todos', checksExistsUserAccount, (req, res) => {
  //usar dados de usuário no req
  const { user } = req;
  console.log(user.todos);
  // console.log(todo);
  return res.json(user.todos);
})


//Buscar to-do de um usuário
app.get('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  //usar dados de usuário no req
  const { user } = req;
  //capturar ID do req.param
  const { id } = req.params;

  //filtrar atividades em usuário onde o ID de req.params seja igual o registrado
  const todo = user.todos.filter((todo => todo.id === id));


  // console.log(user);

  // console.log(todo);
  return res.json(todo);

});

//Criar to-do para um usuário
app.post('/todos', checksExistsUserAccount, (req, res) => {
  //Capturar dados do req.body {objeto desestruturado}
  const { title, deadline } = req.body;
  //objeto do usuário no req
  const { user } = req;

  //objeto de nova atividade
  const todoActivity = {

    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  }

  //crie um novo objeto 'todoActivity' no array 'todos ' do usuário
  user.todos.push(todoActivity);

  const todo = user.todos.find((todo => todo.title === title));

  console.log(todo)
  return res.status(201).json(todoActivity);
});

//Edita name e username do usuário
app.put('/users', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  console.log(user)

  const { name, username } = req.body;

  user.name = name;
  user.username = username;

  return res.status(201).send('cadastro realizado!')
})


//Edita um to-do do usuário
app.put('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  // dados de usuário
  const { user } = req;
  // capturar id do 'req.params'
  //console.log(id);
  const { id } = req.params;

  // capturar inputs do 'req.body'
  //console.log(title, deadline);
  const { title, deadline } = req.body;

  // find: para cada elemento no array 'users/todos', faça um 'todo'.
  //       me retorne os [campos] onde o valor da tabela users.todo corresponda ao id do req.body
  const todo = user.todos.find((todo => todo.id === id));

  //faça uma atualização nos campos
  todo.title = title;
  todo.deadline = new Date(deadline)

  //console.log(todo);

  return res.json(todo);

});

//realiza check em todo (Editar um elemento do todo)
app.patch('/todos/:id/done', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  // dados de usuário
  const { user } = req;
  // capturar id do 'req.params'
  //console.log(id);
  const { id } = req.params;

  // capturar inputs do 'req.body'
  //console.log(title, deadline);

  // find: para cada elemento no array 'users/todos', faça um 'todo'.
  //       me retorne os [campos] onde o valor da tabela users.todo corresponda ao id do req.body
  const todo = user.todos.find((todo => todo.id === id));

  //faça uma atualização nos campos
  todo.done = true;

  //console.log(todo);

  return res.status(201).json(todo);
});

//excluir um usuário
app.delete('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  //usar dados de usuário no req
  const { user } = req;
  //capturar ID do req.param
  const { id } = req.params;

  user.todos.splice(id, 1)

  console.log(user.todos)

  return res.status(204).json(user.todos);

});

module.exports = app;