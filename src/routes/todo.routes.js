import express from 'express';
import { getTodos, getTodo, createTodo, deleteTodo } from '../controllers/todo.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);

export default router;