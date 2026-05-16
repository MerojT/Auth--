import { AppDataSource } from "../config/data-source.js";
import { UserEntity } from "../Entities/user.entity.js";

const userRepo = AppDataSource.getRepository(UserEntity);

export const findUserByUsername = async (username) => {
    return await userRepo.findOneBy({ username });
};

export const createUser = async (userData) => {
    const user = userRepo.create(userData);
    return await userRepo.save(user);
};

export const findUserById = async (id) => {
    return await userRepo.findOne({
        where: { id },
        select: ["id", "username", "role"]
    }); 
};

export const updateRefreshToken = async (userId, token) => {
  return await userRepo.update(userId, { refreshToken: token });
};

export const findUserByRefreshToken = async (token) => {
  return await userRepo.findOneBy({ refreshToken: token });
};