import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Importa o modelo de usuário

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já registrado!' });
    }

    // Faz o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no registro do usuário!', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Compara a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login do usuário!', error });
  }
};

export { register, login };
