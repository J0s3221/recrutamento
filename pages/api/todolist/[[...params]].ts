import { 
  createHandler, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param 
} from "next-api-decorators";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// In-memory storage (replace with a DB in production)
let todos: Todo[] = [];
let nextId = 1;

class TodoHandler {
  // Get all todos
  @Get()
  getTodos() {
    return todos;
  }

  // Get a single todo by ID
  @Get("/:id")
  getTodo(@Param("id") id: string) {
    const todo = todos.find(t => t.id === Number(id));
    if (!todo) return { error: "Todo not found" };
    return todo;
  }

  // Create a new todo
  @Post()
  createTodo(@Body() body: { title: string }) {
    const newTodo: Todo = {
      id: nextId++,
      title: body.title,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  }

  // Update a todo (partial update)
  @Put("/:id")
  updateTodo(@Param("id") id: string, @Body() body: Partial<Todo>) {
    const todo = todos.find(t => t.id === Number(id));
    if (!todo) return { error: "Todo not found" };

    Object.assign(todo, body);
    return todo;
  }

  // Delete a todo
  @Delete("/:id")
  deleteTodo(@Param("id") id: string) {
    const index = todos.findIndex(t => t.id === Number(id));
    if (index === -1) return { error: "Todo not found" };

    const deleted = todos.splice(index, 1);
    return deleted[0];
  }
}

export default createHandler(TodoHandler);
