# Todo-Node
This is a Backend Project using Node js. 
To run project use npm start on terminal. 
Run project on postman using http://localhost:5000/api/todos.

### The project has three routes:
- **Create Todo**: http://localhost:5000/api/todos.
The Create Todo route is a post request that takes two required parameters (name: String, time: String) and one unrequired parameter (reminder: Boolean).

- **Get All Todos**: http://localhost:5000/api/todos. The Get all todos is a get requests that gets all the created todos.

- **Get Todo By Id**: http://localhost:5000/api/todos/id. This route get a single todo by id.

- **Delete Todo**: http://localhost:5000/api/todos/id. This is for deleting a todo by adding it's id.

## Database: 
The project is connected to a NoSQL database, Mongodb. Mongoose was used in the project
