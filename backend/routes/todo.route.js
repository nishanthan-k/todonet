import { Router } from 'express';
import { addToDo, completeToDo, deleteToDo, getToDo } from '../controllers/todo.controller.js';

const router = Router();

router.post('/addToDo', addToDo);
router.get('/getToDo', getToDo);
router.post('/completeToDo', completeToDo);
router.post('/deleteToDo', deleteToDo);

export default router;