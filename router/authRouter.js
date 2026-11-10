import express from 'express';
import { register, login, logout } from '../controller/authController.js';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireLogin, logout);

export default router;