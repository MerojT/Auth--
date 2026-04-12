import * as authRepo from '../repositories/auth.repositories.js';

export const checkUserExists = async (username) => {
    return await authRepo.findUserByUsername(username);
};

export const createNewUser = async (userData) => {
    const user = await authRepo.createUser(userData);
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

export const getUserFullInfo = async (id) => {
    return await authRepo.findUserById(id);
};

export const loginUser = async (username) => {
    return await authRepo.findUserByUsername(username);
};

