const PORT = process.env.PORT ?? 8000;
const cors = require('cors');
const express = require('express');
const app = express();
const pool = require('./db');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let token;

app.use(cors());
app.use(express.json());

//get all todos
app.get('/todos/:userEmail', async (req, res) => {
    const {userEmail} = req.params;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            token = '';
            res.json({
                name: 'TokenExpiredError',
                message: 'jwt expired'
            });
        }
    });

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
        res.json(todos.rows); 
    } catch (err) {
        console.error(err);
    }
});

//Create a new TODO
app.post('/todos', async (req,res) => {
    const id = uuidv4();
    const {user_email, title, progress, date} = req.body;
    
    try {
        const newToDo = pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5);', 
                    [id, user_email, title, progress, date]);
        res.json(newToDo);
    } catch (error) {
        console.error(error);
    }
});

//edit the todo
app.put('/todos/:id', async (req, res) => {
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    try {
        const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
        [user_email, title, progress, date, id]);
        res.json(editToDo);
    } catch (error) {
        console.error(error);
    }
});

//delete the todo
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [id]);
        res.json(deleteToDo);
    } catch (error) {
        console.error(error);
    }
});

//signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const signUp = await pool.query('INSERT INTO users(email, hashed_password) VALUES($1, $2);', 
        [email, hashedPassword]);

        token = jwt.sign({email}, 'secret', {expiresIn: '1m'});
        res.json({email, token});
    } catch (error) {
        console.error(error);
        if(error) {
            res.json({detail: error.detail})
        }
    }
});

//login
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    token = jwt.sign({email}, 'secret', {expiresIn: '1m'});

    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!users.rows.length) return res.json({detail: 'User does not exist!'});
        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        if(success) {
            res.json({'email': users.rows[0].email, token});
        }else {
            res.json({detail: 'Login failed'});
        }
        
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));