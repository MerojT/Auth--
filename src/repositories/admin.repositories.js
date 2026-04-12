import User from '../models/user.model.js';
import Todo from '../models/todo.model.js';

export const findAllUsers = async () => {
    return await User.find().select('-password');
};

export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export const findAllTodos = async () => {
    return await Todo.find().populate('userId', 'username');
};

export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};