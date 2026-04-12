import * as todoRepo from '../repositories/todo.repositories.js';

export const addTask = async (todoData) => {
    return await todoRepo.createTodo(todoData);
};

export const getUserTasks = async (userId) => {
    return await todoRepo.findTodosByUserId(userId);
};

export const removeTask = async (id, userId) => {
    return await todoRepo.deleteTodoById(id, userId);
};