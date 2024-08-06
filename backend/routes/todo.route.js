import { Router } from 'express';
import { addToDo, getToDo } from '../controllers/todo.controller.js';

const router = Router();

router.post('/addToDo', addToDo);
router.get('/getToDo', getToDo);

export default router;