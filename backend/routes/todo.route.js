import { Router } from 'express';
import { addToDo } from '../controllers/todo.controller.js';

const router = Router();

router.post('/addToDo', addToDo);

export default router;