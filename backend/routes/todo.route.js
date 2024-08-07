import { Router } from 'express';
import { addToDo, completeToDo, getToDo } from '../controllers/todo.controller.js';

const router = Router();

router.post('/addToDo', addToDo);
router.get('/getToDo', getToDo);
router.post('/completeToDo', completeToDo);

export default router;