import * as authService from '../services/auth.service.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateTokens = (id, role) => {
    const accessToken = jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' }); 
    return { accessToken, refreshToken };
};


export const register = async (req, res) => {
  try {
      const { username, password, role } = req.body; 
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await authService.createNewUser({
          username,
          password: hashedPassword,
          role: role || 'user'
      });

      const tokens = generateTokens(user.id, user.role);
      await authService.updateRefreshToken(user.id, tokens.refreshToken);

      res.status(201).json({
          ...tokens,
          id: user.id,
          username: user.username,
          role: user.role
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await authService.loginUser(username);

      if (user && (await bcrypt.compare(password, user.password))) {
          const tokens = generateTokens(user.id, user.role);
          await authService.updateRefreshToken(user.id, tokens.refreshToken); 

          res.json({
              ...tokens,
                id: user.id,
                username: user.username,
              role: user.role
          });
      } else {
          res.status(401).json({ message: "Неверный логин или пароль" });
      }
  } catch (error) {
      res.status(500).json({ message: "Ошибка при входе" });
  }
};

export const getMe = async (req, res) => {
    try {
        const user = await authService.getUserFullInfo(req.user.id);
        res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении данных"});
      res.status(500).json({ message: "Ошибка сервера" });
    }
};
