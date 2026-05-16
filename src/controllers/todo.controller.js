import * as todoService from "../services/todo.service.js";

export const getTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getTodos(req.user.id);
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

export const getTodo = async (req, res, next) => {
    try {
        const todo = await todoService.getTodo(Number(req.params.id), req.user.id);
        if (!todo) return res.status(404).json({ message: "Задача не найдена" });
        res.json(todo);
    } catch (error) {
        next(error);
    }
};

export const createTodo = async (req, res, next) => {
    try {
        const todo = await todoService.createTodo({
            ...req.body,
            user: { id: req.user.id }
        });
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
};

export const deleteTodo = async (req, res, next) => {
    try {
        const todo = await todoService.deleteTodo(Number(req.params.id), req.user.id);
        if (!todo) return res.status(404).json({ message: "Задача не найдена или нет доступа" });
        res.json({ message: "Удалено", todo });
    } catch (error) {
        next(error);
    }
};