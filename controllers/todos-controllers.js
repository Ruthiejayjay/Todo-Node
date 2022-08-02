const Todo = require('../models/todo');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

//Creat a new Todo
const createTodo = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }
    const createdTodo = new Todo({
        name: req.body.name,
        time: req.body.time,
        reminder: req.body.reminder,
        isCompleted: req.body.isCompleted
    });
    try {
        await createdTodo.save();
    } catch (err) {
        const error = new HttpError(
            'Creating todo failed, please try again.',
            500
        );
        return next(error);
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
        const error = new HttpError(
            'Todo not found',
            404
        );
        return next(error)
    }

    if (!todo) {
        const error = new HttpError(
            'Could not find a todo for the provided id.',
            404
        );
        return next(error);
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
        const error = new HttpError(
            'Could not find Todo',
            500
        );
        return next(error)
    }
    todo.isCompleted = isCompleted;

    try {
        await todo.save();
    } catch (err) {
        const error = new HttpError(
            'Could not Update Todo',
            500
        );
        return next(error)
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
        const error = new HttpError(
            'Something went wrong. could not find todo',
            500
        );
        return next(error)
    }

    try {
        await todo.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete todo.',
            500
        );
        return next(error);
    }
    res.status(204).json({ message: 'Deleted todo.' })
}




exports.createTodo = createTodo;
exports.getTodos = getTodos;
exports.getTodoById = getTodoById;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;