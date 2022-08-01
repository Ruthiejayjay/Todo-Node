const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://todoNode:testTodo@cluster0.vlfvq.mongodb.net/todos_test?retryWrites=true&w=majority'


const createTodo = async (req, res, next) => {
    const newTodo = {
        name: req.body.name,
        time: req.body.time
    };
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = db.collection('todos').insertOne(newTodo);
    } catch (error) {
        return res.json({ message: 'could not create todo.' })
    };
    client.close();

    res.json(newTodo);
};

const getTodos = async (req, res, next) => {
    const client = new MongoClient(url);
    let todos
    try {
        await client.connect();
        const db = client.db();
        todos = await db.collection('todos').find().toArray();
    } catch (error) {
        return res.json({message: 'could not get todos.'})
    };

    client.close();

    res.json(todos)
};

exports.createTodo = createTodo;
exports.getTodos = getTodos;