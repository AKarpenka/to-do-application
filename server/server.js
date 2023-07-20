const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const {v4: uuidv4} = require('uuid');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const {userEmail} = req.params;
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows); 
    } catch (err) {
        console.log(err);
    }
});

//Create a new TODO
app.post('/todos', async (req,res) => {
    const id = uuidv4();
    const {user_email, title, progress, date} = req.body;
    
    console.log(req.body);
    try {
        const newToDo = pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5);', 
                    [id, user_email, title, progress, date]);
        res.json(newToDo);
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));