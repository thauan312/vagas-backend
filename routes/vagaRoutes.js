const express = require('express');
const vagaController = require('../controllers/vagaController');
const authMiddleware = require('../middlewares/authMiddleware'); // Autenticação JWT
const router = express.Router();

// Rotas de vagas
router.get('/', vagaController.listarVagas);
router.post('/', authMiddleware, vagaController.criarVaga);
router.put('/:id', authMiddleware, vagaController.editarVaga);
router.delete('/:id', authMiddleware, vagaController.deletarVaga);

module.exports = router;
