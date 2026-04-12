import * as authService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const userExists = await authService.checkUserExists(username);
        if (userExists) {
            return res.status(400).json({ message: "Имя занято" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await authService.createNewUser({
            username,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            ...user,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        console.error("ПОЛНАЯ ОШИБКА ТУТ:", error); 
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await authService.loginUser(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(401).json({ message: "Неверный логин или пароль" });
        }
    } catch (error) {
        console.error("ОШИБКА ЛОГИНА:", error);
        res.status(500).json({ message: "Ошибка при входе" });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await authService.getUserFullInfo(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(user);
    } catch (error) {
        console.error("ОШИБКА GET_ME:", error);
        res.status(500).json({ message: "Ошибка при получении данных" });
    }
};
