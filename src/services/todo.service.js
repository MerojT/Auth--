import * as todoRepo from '../repositories/todo.repositories.js';

export const getTodos = async (userId) => {
    return await todoRepo.findAllTodos(userId);
}

export const getTodo = async (id, userId) => {
    return await todoRepo.findTodoById(id, userId);
}

export const createTodo = async (todoData) => {
    return await todoRepo.createTodo(todoData);
}

export const deleteTodo = async (id, userId) => {
    return await todoRepo.deleteTodoById(id, userId);
}

export const updateStatus = async (id, isCompleted, userId) => {
    return await todoRepo.updateTodoStatus(id, isCompleted, userId);
}