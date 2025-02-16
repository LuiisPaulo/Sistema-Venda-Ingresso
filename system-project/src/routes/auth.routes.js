import express from 'express';
const router = express.Router();
import authController from '../controllers/auth.controller';

router.post('/login', authController.login);
router.post('/register', authController.register);

exports.modules = router;