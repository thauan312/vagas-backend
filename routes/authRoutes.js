const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

// Editar usuário (precisa de autenticação)
router.put('/user', authMiddleware, authController.editarUsuario);

module.exports = router;