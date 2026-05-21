import * as adminRepo from '../repositories/admin.repositories.js';

export const getAllUsers = async () => {
    return await adminRepo.findAllUsers();
};

export const getAllTodos = async () => {
    return await adminRepo.findAllTodos();
};

export const changeRole = async (userId, role) => {
    return await adminRepo.updateUser(userId, { role });
};

export const removeUserAccount = async (userId) => {
    return await adminRepo.deleteUser(userId);
};

export const deleteTodo = async (todoId) => {
    return adminRepo.deleteTodo(todoId)
}
  
export const createTodo = async (userId, todoData) => {
    return adminRepo.createTodo(userId, todoData)
}
  
export const updateTodo = async (todoId, todoData) => {
    return adminRepo.updateTodo(todoId, todoData)
}