import * as authRepo from '../repositories/auth.repositories.js';

export const checkUserExists = async (username) => {
    return await authRepo.findUserByUsername(username);
};

export const createNewUser = async (userData) => {
    const user = await authRepo.createUser(userData);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const getUserFullInfo = async (id) => {
    return await authRepo.findUserById(id);
};

export const loginUser = async (username) => {
    return await authRepo.findUserByUsername(username);
};

export const updateRefreshToken = async (userId, token) => {
  return await authRepo.updateRefreshToken(userId, token);
};

export const findUserByToken = async (token) => {
  return await authRepo.findUserByRefreshToken(token);
};