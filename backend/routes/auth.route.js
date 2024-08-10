import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller.js';
import { isUserAlreadyExists } from '../middlewares/user.middlewares.js';

const router = Router();

router.post('/login', login);
router.post('/signup', isUserAlreadyExists, signup);

export default router;
