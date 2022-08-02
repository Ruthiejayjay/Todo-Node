const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Date, required: true },
    reminder: { type: Boolean },
    isCompleted: { type: Boolean, default: false}
}, {versionKey:false});

module.exports = mongoose.model('Todo', todoSchema);