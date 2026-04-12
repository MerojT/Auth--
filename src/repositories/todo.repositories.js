import Todo from '../models/todo.model.js';

export const createTodo = async (todoData) => {
    return await Todo.create(todoData);
};

export const findTodosByUserId = async (userId) => {
    return await Todo.find({ userId });
};

export const deleteTodoById = async (id, userId) => {
    return await Todo.findOneAndDelete({ _id: id, userId });
};