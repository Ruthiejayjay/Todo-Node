const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const HttpError = require('./models/http-error');
const todoRoutes = require('./routes/todos-routes');


const app = express();

//app.use(bodyParser.json());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/todos', todoRoutes);



app.use((req, res, next) => {
  res.status(404).json({message: 'Could not find this route'})
  });

mongoose
    .connect('mongodb+srv://todoNode:testTodo@cluster0.vlfvq.mongodb.net/todos_test?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
