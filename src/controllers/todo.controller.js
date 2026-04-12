import * as todoService from '../services/todo.service.js';

export const createTodo = async (req, res) => {
    try {
        const newTodo = await todoService.addTask({
            ...req.body,
            userId: req.user.id
        });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Ошибка создания задачи" });
    }
};

export const getMyTodos = async (req, res) => {
    try {
        const todos = await todoService.getUserTasks(req.user.id);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения списка" });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await todoService.removeTask(req.params.id, req.user.id);
        if (!todo) {
            return res.status(404).json({ message: "Задача не найдена" });
        }
        res.json({ message: "Удалено" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка удаления" });
    }
};