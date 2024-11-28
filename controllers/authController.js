const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar se o e-mail já está cadastrado
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Retorna a resposta com os dados do novo usuário e uma mensagem de sucesso
    res.status(201).json({ 
      message: 'Usuário registrado com sucesso', 
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      } 
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário', details: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Credenciais inválidas' });

    // Cria o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Resposta com o token e dados do usuário
    res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logout bem-sucedido' });
};

const editarUsuario = async (req, res) => {
  try {
    const userId = req.userId; // ID do usuário autenticado via middleware
    const { name, email, password } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar usuário', details: error.message });
  }
};

module.exports = { register, login, logout, editarUsuario };

