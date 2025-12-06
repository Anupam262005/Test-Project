import express from 'express';
import { register, login, refreshAccessToken, getCurrentUser } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', verifyJWT, getCurrentUser);

export default router;
