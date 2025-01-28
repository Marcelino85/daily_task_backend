import express from 'express';
import { register, login } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

// Rota para registro de usuários
router.post('/register', register);

// Rota para login de usuários
router.post('/login', login);

router.get('/protected',authMiddleware,(req, res)=>{
    const username = req.user.username || 'usuário desconhecido';
    res.status(200).json({message:`Olá ${username}! Você acessou uma rota protegida.`})

})

export default router;
