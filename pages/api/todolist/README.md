## Todo List Feature (API-Only)

This Todo List feature currently does not have a frontend UI. You can interact with it through the terminal or any REST client using HTTP requests.

To use the todo list through the terminal first you need to launch the application and then use the curl commands to make REST requests.

## Example commands

# Create a new todo
curl -X POST http://localhost:3000/api/todolist -H "Content-Type: application/json" -d '{"title":"todo"}'

# Get all todos
curl http://localhost:3000/api/todolist

# Get a single todo by ID
curl http://localhost:3000/api/todolist/1

# Update a todo
curl -X PUT http://localhost:3000/api/todolist/1 -H "Content-Type: application/json" -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:3000/api/todolist/1
