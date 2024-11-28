const Vaga = require('../models/Vaga');

// Listar vagas
const listarVagas = async (req, res) => {
  try {
    const vagas = await Vaga.findAll();
    res.status(200).json(vagas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vagas', details: error.message });
  }
};

// Criar vaga
const criarVaga = async (req, res) => {
  try {
    const { title, description, isOpen } = req.body;
    const novaVaga = await Vaga.create({ title, description, isOpen });
    res.status(201).json(novaVaga);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar vaga', details: error.message });
  }
};

// Editar vaga
const editarVaga = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isOpen } = req.body;

    const vaga = await Vaga.findByPk(id);
    if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });

    vaga.title = title;
    vaga.description = description;
    vaga.isOpen = isOpen;
    await vaga.save();

    res.status(200).json(vaga);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao editar vaga', details: error.message });
  }
};

// Deletar vaga
const deletarVaga = async (req, res) => {
  try {
    const { id } = req.params;

    const vaga = await Vaga.findByPk(id);
    if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });

    await vaga.destroy();
    res.status(200).json({ message: 'Vaga deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar vaga', details: error.message });
  }
};

module.exports = { listarVagas, criarVaga, editarVaga, deletarVaga };
