import * as adminService from '../services/admin.service.js';

export const getFullControl = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        const todos = await adminService.getAllTodos();
        res.json({ users, todos });
    } catch (error) {
        res.status(500).json({ message: "Ошибка доступа к данным" }); 
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const updatedUser = await adminService.changeRole(req.params.id, req.body.role);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Ошибка обновления роли" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await adminService.removeUserAccount(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Problem with deleting" });
    }
};

export const getAllTodos = async (req, res, next) => {
    try {
        const todos = await adminService.getAllTodos()
        res.json(todos)
    } catch (error) {
        next(error)
    }
};

export const deleteTodo = async (req, res, next) => {
    try {
        const deleteTodo = await adminService.deleteTodo(req.params.id)
        res.jspn ({
            message: "Todo deleted",
            todo: deleteTodo,
        })
    } catch (error) {
        next(error)
    }
}


export const createTodo = async (req, res, next) => {
    try {
      const { userId, ...todoData } = req.body 
      const todo = await adminService.createTodo(userId, todoData)
      res.status(201).json(todo)
    } catch (error) {
      next(error)
    }
  }
  
  export const updateTodo = async (req, res, next) => {
    try {
      const todo = await adminService.updateTodo(req.params.id, req.body)
      res.json(todo)
    } catch (error) {
      next(error)
    }
  }