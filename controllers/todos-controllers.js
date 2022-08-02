const Todo = require('../models/todo');
const moment = require('moment');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

//Creat a new Todo
const createTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(404).json({message: 'Invalid Inputs passed, check your data'})
    }
    const createdTodo = new Todo({
        name: req.body.name,
        time: moment.utc(req.body.time, 'YYYY-MM-DD hh:mm:ss a'),
        reminder: req.body.reminder,
        isCompleted: req.body.isCompleted
    });
    try {
        await createdTodo.save();
    } catch (err) {
        res.status(404).json({message: 'Creating Todo failed'})
    }

    res.status(201).json({ todo: createdTodo });
};

//get all Todos
const getTodos = async (req, res, next) => {
    const todos = await Todo.find().exec();
    res.json(todos);
};

//get Todo by id
const getTodoById = async (req, res, next) => {
    const todoId = req.params.tid;

    let todo;
    try {
        todo = await Todo.findById(todoId);

    } catch (err) {
        res.status(404).json({message: 'Todo not found'})
    }

    if (!todo) {
        res.status(404).json({message: 'Could not find Todo for the provided Id'})
    }

    res.status(200).json({ todo })

}

//update todo status
const updateTodo = async (req, res, next) => {
    const { isCompleted } = req.body;
    const todoId = req.params.tid;

    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        res.status(404).json({message: 'Could not find Todo for the provided Id'})
    }
    todo.isCompleted = isCompleted;

    try {
        await todo.save();
    } catch (err) {
        res.status(404).json({message: 'Could not update Todo'})
    }
    res.status(204).json({ message: 'Todo updated'})
}

//delet a todo by id
const deleteTodo = async (req, res, next) => {
    const todoId = req.params.tid;

    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        res.status(404).json({message: 'Todo not found'})
        return next(error)
    }

    try {
        await todo.remove();
    } catch (err) {
        res.status(500).json({message: 'Could not Delete Todo'})
        return next(error);
    }
    res.status(204).json({ message: 'Deleted todo.' })
}




exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;