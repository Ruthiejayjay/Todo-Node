# Todo-Node
This is a Backend Project using Node js. 

## Build Setup
```bash
# install dependencies
$ npm install

# launch server at localhost:5000/api/todos
$ npm start
```

Run project on postman using http://localhost:5000/api/todos.

### The project has three routes:
- **Create Todo**: http://localhost:5000/api/todos.
The Create Todo route is a post request that takes two required parameters (name: String, reminderAt: Date) and one unrequired parameter (reminder: Boolean, (default: false)).

- **Get All Todos**: http://localhost:5000/api/todos. The Get all todos is a get requests that gets all the created todos.

- **Get Todo By Id**: http://localhost:5000/api/todos/id. This route get a single todo by id.

- **Update A Completed Todo**: http://localhost:5000/api/todos/id/completed. This route is to update the todo status from isCompleted:false (the default status at creation), to isCompleted: true. This route is used when a todo has been completed. This is  PATCH request.

- **Update A Todo**: http://localhost:5000/api/todos/id. This route is for updating a todo details.

- **Delete Todo**: http://localhost:5000/api/todos/id. This is for deleting a todo by adding it's id.

## Database: 
The project is connected to a NoSQL database, Mongodb. Mongoose was used in the project
