import {
    createHandler,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from "next-api-decorators";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoHandler {
    
    // Get all todos
    @Get()
    async getTodos() {
        return await prisma.todo.findMany({
            orderBy: { createdAt: "desc" },
        });
    }   

    // Get a single todo by ID
    @Get("/:id")
    async getTodo(@Param("id") id: string) {
        const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
        if (!todo) return { error: "Todo not found" };
        return todo;
    }   

    // Create a new todo
    @Post()
    async createTodo(@Body() body: { title: string }) {
        return await prisma.todo.create({
            data: { title: body.title },
        });
    }   

    // Update a todo
    @Put("/:id")
    async updateTodo(
        @Param("id") id: string,
        @Body() body: Partial<{ title: string; completed: boolean }>
    ) {
        try {
            return await prisma.todo.update({
                where: { id: Number(id) },
                data: body,
            });
        } catch {
            return { error: "Todo not found" };
        }
    }   

    // Delete a todo
    @Delete("/:id")
    async deleteTodo(@Param("id") id: string) {
        try {
            return await prisma.todo.delete({ where: { id: Number(id) } });
        } catch {
            return { error: "Todo not found" };
        }
    }
}

export default createHandler(TodoHandler);
