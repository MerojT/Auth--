import express from 'express';
import { createTodo, getMyTodos, deleteTodo } from '../controllers/todo.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', createTodo);
router.get('/', getMyTodos);
router.delete('/:id', deleteTodo);

export default router;