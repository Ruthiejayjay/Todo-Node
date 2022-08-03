const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reminderAt: { type: Date },
    reminder: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);