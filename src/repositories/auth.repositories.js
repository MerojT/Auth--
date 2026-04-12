import User from '../models/user.model.js';

export const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserById = async (id) => {
    return await User.findById(id).select('-password');
};