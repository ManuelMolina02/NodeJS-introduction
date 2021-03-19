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
  // console.log("Retorno 1: 'username' do req.headers | ", username);


  // find: no array 'users' faça uma busca de 'username' onde será verificado se o 'username' inserido no 'req.headers' corresponde a algum já cadastrado.

  // armazene o retorno em 'user'
  const user = users.find(user => user.username === username);
  // console.log("Retorno 2: elemento no array que corresponde ao 'username' validado no find | ", user);


  //se 'username' não tiver correspondência retorne o erro, se não continue a ação
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  //se o 'username' existe, armazene as informações deste usuário
  req.user = user;

  return next();
}

// Validar se 'TODO' de usuário existe
function checksExistsTodo(req, res, next) {
  // objeto dos dados de usuário
  const { user } = req;
  // console.log("Retorno 1: dados de usuário, requisita o objeto do 'user' (checksExistsUserAccount) | ", user);

  // capturar id do 'req.params'
  const { id } = req.params;
  // console.log("Retorno 2: ID do 'todo' inserido no 'req.params' | ", id);

  // find: no array 'users/todos' faça uma busca do 'todo' com ID correspondente ao inserido no 'req.params'
  const todo = user.todos.find((todo => todo.id === id));
  //console.log("Retorno 3: elemento do 'todo' que corresponde ao ID enviado no 'req.params'  | ", todo);


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
  //    console.log("Retorno 1: 'name' e 'username' do req.body | ", name, username);

  //Validar se username já existe


  //some: no array 'users' faça uma busca de 'username' onde será verificado se o dado inserido no 'req.headers' corresponde a algum já cadastrado.

  //armazene o booleano em 'userAlreadyExists'
  const userAlreadyExists = users.some(
    (user) => user.username === username
  );
  //    console.log("Retorno 2: booleano de validação (userAlreadyExists), verifica se 'username' enviado pelo req.body já existe | ", userAlreadyExists);

  //se o retorno de usuário existente for verdadeiro execute o erro, se não continue executanto
  if (userAlreadyExists) {
    return res.status(400).json({ error: 'Username already exists!' })
  }

  const user = {
    name,
    username,
    id: uuidv4(),
    todos: [],
  }
  //na tabela 'users' insira:
  users.push(user)

  //retornar o resultado em um objeto com os dados do usuário
  //retornar status 201 (CREATED)
  return res.json(user).status(201);
});

//Buscar lista dos usuários cadastrados
app.get('/users', (req, res) => {
  //mostre no console a tabela 'users'
  console.log("Retorno: tabela 'users' | ", users)

  //retorne na rota a tabela 'users'
  return res.json(users);
});

// ----->>  ATIVIDADES || TO-DOS <<-----

//Buscar to-dos de um usuário (1 ou + de 1)
app.get('/todos', checksExistsUserAccount, (req, res) => {
  //usar dados de usuário no req
  const { user } = req;
  //    console.log("Retorno 1: objeto do 'user' | ", user)

  //    console.log("Retorno 2: 'todos' do usuário |", user.todos);
  return res.json(user.todos);
})


//Buscar to-do de um usuário (apenas 1)
app.get('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  //usar dados de usuário no req
  const { user } = req;
  //console.log("Retorno 1: desestruturar objeto do 'user'  | ", user)

  //capturar ID do req.param
  const { id } = req.params;
  //    console.log("Retorno 2: desestruturar objeto do 'id' de req.params | ", id)

  //filter: no array 'users.todos' faça uma busca onde 'todo.id' deve ser correspondente ao ID enviado no req.params
  const todo = user.todos.filter((todo => todo.id === id));
  //    console.log("Retorno 3: elemento 'todo', resposta filtrada do array tem 'todo.id' correspondete ao enviado pelo req.params | ", todo);

  return res.json(todo);

});

//Criar to-do para um usuário
app.post('/todos', checksExistsUserAccount, (req, res) => {
  //Capturar dados do req.body {objeto desestruturado}
  const { title, deadline } = req.body;
  //    console.log("Retorno 1: 'title' e 'deadline' do req.body | ", title, deadline);

  //objeto do usuário no req
  const { user } = req;
  //    console.log("Retorno 2: desestruturar objeto do 'user'  | ", user)

  //objeto de nova atividade
  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  }
  //crie um novo objeto 'todo' no array 'todos' do usuário
  user.todos.push(todo);

  //    console.log("Retorno 3: objeto do new 'todo'  | ", todo)

  return res.status(201).json(todo);
});

//Edita name e username do usuário
app.put('/users', checksExistsUserAccount, (req, res) => {
  const { name, username } = req.body;
  //    console.log("Retorno 1: 'name' e 'username' do req.body | ", name, username);

  const { user } = req;
  //    console.log("Retorno 2: desestruturar objeto do 'user'  | ", user)

  //Atualize os campos informados com as informações armazenadas nas variáveis
  user.name = name;
  user.username = username;
  //    console.log("Retorno 3: objeto do usuário atualizado | ", user)
  return res.status(201).json(user)
})


//Edita um to-do do usuário
app.put('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {

  const { title, deadline } = req.body;
  //  console.log("Retorno 1: 'title' e 'deadline' do req.body | ", title, deadline);

  const { id } = req.params;
  //  console.log("Retorno 2: 'id' do req.params | ", id);

  const { user } = req;
  //  console.log("Retorno 3: desestruturar objeto do 'user'  | ", user)

  // find: no array 'users.todos' faça uma busca do 'todo' com ID correspondente ao inserido no 'req.params'
  const todo = user.todos.find((todo => todo.id === id));

  //faça uma atualização nos campos
  todo.title = title;
  todo.deadline = new Date(deadline)
  //  console.log("Retorno 4: objeto do usuário/todo atualizado | ", todo)

  return res.json(todo).status(201);

});

//realiza check em todo (Editar um elemento do todo)
app.patch('/todos/:id/done', checksExistsUserAccount, checksExistsTodo, (req, res) => {

  const { id } = req.params;
  // console.log("Retorno 1: 'id' do req.params | ", id);

  // dados de usuário
  const { user } = req;
  // console.log("Retorno 2: desestruturar objeto do 'user'  | ", user)

  // find: no array 'users.todos' faça uma busca do 'todo' com ID correspondente ao inserido no 'req.params'
  const todo = user.todos.find((todo => todo.id === id));

  //faça uma atualização nos campos
  todo.done = true;
  // console.log("Retorno 3: objeto do usuário/todo atualizado | ", todo)

  return res.json(todo).status(201);
});

//excluir um todo
app.delete('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {

  const { id } = req.params;
  console.log("Retorno 1: 'id' do req.params | ", id);

  // dados de usuário
  const { user } = req;
  console.log("Retorno 2: desestruturar objeto do 'user'  | ", user)

  // splice: no array 'user.todos' faça uma busca do 'todo' com ID correspondente ao inserido no 'req.params' em seguida remova este elemento.
  user.todos.splice(id, 1)
  console.log("Retorno 3: array de 'todos' do usuário | ", user.todos)

  return res.status(204).json(user.todos);

});

module.exports = app;