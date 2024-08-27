const express = require('express');
const app = express()

let todos=[];

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', function (req, res) {
    res.send("<center><h1>To Do APP (In Memory)</h1></center>");
  })

app.get('/retrieve-todos', function (req, res) {
    if(todos.length==0)
    {
        res.send("<center><h1>Empty List!</h1></center>");
    }
    else
    {
    res.status(200).send(todos);
    }
})


app.post('/create-todo', function (req, res) {

    if(!req.body.description || !req.body.id)
    {
        res.status(404).send("Can't add an Empty todo!");
    }
    else
    {  
        const todo ={
            title: req.body.description,
            id: req.body.id
        }
        todos.push(todo);
        res.status(200).send(`Successfully created a todo with id ${todo.id}`);
    }
    
})

app.put('/update-todo/:idx', function (req, res) {
    const idx = parseInt(req.params.idx, 10); 
    const todoIndex = todos.findIndex(todo => todo.id === idx);
     
    if(todoIndex<0)
    {
        res.status(404).send(`There is no any todo presnt with id ${idx}`);
    }
    else if(!req.body.title)
    {
        res.status(404).send("Please provide the content to update!");
    }
    else
    {
        todos[todoIndex].title = req.body.title; 
        res.status(200).send(`Successfully updated a todo with id ${idx}`);
    }
        
});


app.delete('/delete-todo/:idx', function (req, res) {
    const idx = parseInt(req.params.idx, 10);
    const todoIndex = todos.findIndex(todo => todo.id === idx);

    if(todoIndex<0)
    {
         res.status(404).send(`There is no any todo presnt with id ${idx}`);
    }
    else
    {
        todos.splice(todoIndex,1);
        res.send(`Successfully deleted a todo with id ${idx}`);
    }
    
})

app.listen(3000);