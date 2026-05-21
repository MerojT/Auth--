import express from 'express';
import { getFullControl, updateUserRole, deleteUser, getAllTodos, deleteTodo, createTodo, updateTodo} from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';


const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware); 

router.get('/control', getFullControl);
router.patch('/user/:id', updateUserRole);
router.delete('/user/:id', deleteUser);

router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo)

export default router;