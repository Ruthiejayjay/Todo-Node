const mongoose = require('mongoose');

const Todo = require('./models/todo');

mongoose.connect(
    'mongodb+srv://todoNode:testTodo@cluster0.vlfvq.mongodb.net/todos_test?retryWrites=true&w=majority'
)

//Creat a new Todo
const createTodo = async (req, res, next) => {
    const createdTodo = new Todo({
        name: req.body.name,
        time: req.body.time,
        reminder: req.body.reminder
    });
    const result = await createdTodo.save();
    res.json(result);
};

//get all Todos
const getTodos = async (req, res, next) => {
    const todos = await Todo.find().exec();
    res.json(todos);
};

//get Todo by id
const getTodoById = (req, res, next) => {
    const todoId = req.params.tid;
}



exports.createTodo = createTodo;
exports.getTodos = getTodos;