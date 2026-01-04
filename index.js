// Routing
// HTTP requests
/*
 GET /books --> Получаем список всех книг
 POST /books --> Добавляем в список книги
 PUT /books/:id --> Обновляем данные о книге с конкретным айди
 DELETE /books/:id --> Удаляем книгу
*/
import express from 'express';
const app = express();
const port = 3000;
app.use(express.json())

let todos = [
    {id: 1, title: "Learn Node.js", completed: false},
    {id: 2, title: "Learn Python flaskAPI", completed: false},
    {id: 3, title: "take a shower", completed: false}
];

// 1- Get request  (get task)

app.get('/todos', (req, res) => {
    res.send(todos); // -> Отправляем массив в формате json
});

// 2 - GET - Get one of task (Dynamic routing)
app.get('todos/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo){
        res.json(todos);
    }else{
        res.status(404).send('No todos found!');
    }
})

// 3-  POST - Create a new task

app.post('/todos',(req,res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

// 4 - Delete task

app.delete('/todos/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.send(`${id}'s todos deleted!`)
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})