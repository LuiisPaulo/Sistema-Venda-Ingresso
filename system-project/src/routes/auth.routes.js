import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller.js';

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;