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
        res.json({ message: "Пользователь удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка удаления" });
    }
};