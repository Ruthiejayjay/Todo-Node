const express = require('express');
const { check } = require('express-validator');
const todoControllers = require('../controllers/todos-controllers')

const router = express.Router();

router.get('/', todoControllers.getTodos);
router.get('/:tid', todoControllers.getTodoById);
router.post('/',
    [
        check('name')
            .not()
            .isEmpty(),
        check('time')
            .not()
            .isEmpty()
    ],
    todoControllers.createTodo
);
router.patch('/:tid', todoControllers.updateTodo);
router.delete('/:tid', todoControllers.deleteTodo)



module.exports = router;