const express = require('express');
const { check } = require('express-validator');
const todoControllers = require('../controllers/todos-controllers')

const router = express.Router();

router.get('/', todoControllers.getTodos);
router.get('/:todoId', todoControllers.getTodoById);
router.post('/',
    [
        check('name')
            .not()
            .isEmpty()
    ],
    todoControllers.createTodo
);
router.patch('/:todoId', todoControllers.updateTodo);
router.patch('/:todoId/completed', todoControllers.updateTodoCompleted);
router.delete('/:todoId', todoControllers.deleteTodo);



module.exports = router;