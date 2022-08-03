const Todo = require('../models/todo');
const moment = require('moment');
const { validationResult } = require('express-validator');


//Creat a new Todo
const createTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ message: 'name must be entered' })
    }
    const createdTodo = new Todo({
        name: req.body.name,
        reminderAt: req.body.reminderAt ? moment.utc(req.body.reminderAt, 'YYYY-MM-DD hh:mm:ss a') : null,
        reminder: req.body.reminder,
        isCompleted: req.body.isCompleted
    });
    try {
        await createdTodo.save();
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: 'Creating Todo failed' })
    }

    return res.status(201).json({ todo: createdTodo });
};

//get all Todos
const getTodos = async (req, res, next) => {
    const todos = await Todo.find().exec();
    return res.json(todos);
};

//get Todo by id
const getTodoById = async (req, res, next) => {
    const todoId = req.params.todoId;

    let todo;
    try {
        todo = await Todo.findById(todoId);

    } catch (err) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    if (!todo) {
        return res.status(404).json({ message: 'Could not find Todo for the provided Id' })
    }

    return res.status(200).json({ todo })

}

//update todo status to isCompleted true 
const updateTodoCompleted = async (req, res, next) => {
    const { isCompleted } = req.body;
    const todoId = req.params.todoId;
    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        res.status(404).json({ message: 'Could not find Todo for the provided Id' })
    }
    todo.isCompleted = isCompleted;

    try {
        await todo.save();
    } catch (err) {
        res.status(404).json({ message: 'Could not update Todo' })
    }
    res.status(204).json({ message: 'Todo updated' })
}

//update todo details
const updateTodo = async (req, res, next) => {
    const { name, reminderAt, reminder } = req.body;
    const todoId = req.params.todoId;

    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        return res.status(404).json({ message: 'Could not find Todo for the provided Id' })
    }

    todo.name = name;
    todo.reminderAt = reminderAt;
    todo.reminder = reminder;
    try {
        await todo.save();
    } catch (err) {
        return res.status(404).json({ message: 'Could not update Todo' })
    }
    return res.status(204).json({ message: 'Todo updated' })
}

//delet a todo by id
const deleteTodo = async (req, res, next) => {
    const todoId = req.params.todoId;

    let todo;
    try {
        todo = await Todo.findById(todoId);
    } catch (err) {
        res.status(404).json({ message: 'Todo not found' })

    }

    try {
        await todo.remove();
    } catch (err) {
        return res.status(500).json({ message: 'Could not Delete Todo' })

    }
    return res.status(204).json({ message: 'Deleted todo.' })
}




exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;
exports.updateTodoCompleted = updateTodoCompleted;
exports.deleteTodo = deleteTodo;