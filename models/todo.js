const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: String, required: true },
    reminder: { type: Boolean }
});

module.exports = mongoose.model('Todo', todoSchema);