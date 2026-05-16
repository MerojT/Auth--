import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../Entities/todo.entity.js";

const todoRepo = AppDataSource.getRepository(TodoEntity);

export const findAllTodos = async (userId) => {
    return await todoRepo.find({
        where: { user: { id: userId } },
        order: { id: "DESC" }
    });
};

export const findTodoById = async (id, userId) => {
    return await todoRepo.findOne({
        where: { id, user: { id: userId } }
    });
};

export const createTodo = async (todoData) => {
    const todo = todoRepo.create(todoData);
    return await todoRepo.save(todo);
};

export const deleteTodoById = async (id, userId) => {
    const todo = await findTodoById(id, userId);
    if (!todo) return null;
    return await todoRepo.remove(todo);
};

export const updateTodoStatus = async (id, isCompleted, userId) => {
    await todoRepo.update({ id, user: { id: userId } }, { isCompleted });
    return await findTodoById(id, userId);
};