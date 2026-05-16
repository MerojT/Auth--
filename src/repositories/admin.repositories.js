import { AppDataSource } from "../config/data-source.js";
import { UserEntity } from "../Entities/user.entity.js";
import { TodoEntity } from "../Entities/todo.entity.js";

const userRepo = AppDataSource.getRepository(UserEntity);
const todoRepo = AppDataSource.getRepository(TodoEntity);

export const findAllUsers = async () => {
    return await userRepo.find({
        select: ["id", "username", "role"]
    });
};

export const updateUser = async (userId, updateData) => {
    await userRepo.update(userId, updateData);
    return await userRepo.findOneBy({ id: userId });
};

export const findAllTodos = async () => {
    return await todoRepo.find({
        relations: ["user"] 
    });
};

export const deleteUser = async (userId) => {
    const user = await userRepo.findOneBy({ id: userId });
    if (user) {
        return await userRepo.remove(user);
    }
    return null;
};