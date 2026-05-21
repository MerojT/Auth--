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

export const deleteUser = async (userId) => {
    const user = await userRepo.findOneBy({ id: userId });
    if (user) {
        return await userRepo.remove(user);
    }
    return null;
};

export const findAllTodos = async () => {
    return await todoRepo.find({
        relations: ["user"] 
    });
};
export const deleteTodo = async (todoId) => {
    const todo = await todoRepo.findOne({ where: { id: todoId } }); 
    if (!todo) return null;
    await todoRepo.delete(todoId);                                   
    return todo;
};

export const createTodo = async (userId, todoData) => {
    const user = await userRepo.findOne({ where: { id: userId } });  
    if (!user) return null;
    const todo = todoRepo.create({ ...todoData, user });
    return todoRepo.save(todo);
};

export const updateTodo = async (todoId, todoData) => {
    await todoRepo.update(todoId, todoData);                         
    return todoRepo.findOne({ where: { id: todoId } });           
};