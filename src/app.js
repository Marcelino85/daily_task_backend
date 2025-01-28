import express from 'express';
import cors from 'cors';
import db from './db/config.js'; // Adicionado a extensão .js
import setupAssociations from './models/associations.js';
import authRoutes from './routes/authRoutes.js'; // Adicione essa linha
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar associações
setupAssociations();

// Rotas
app.use('/auth', authRoutes); // Adicione essa linha

app.get('/', (req, res) => {
  res.status(200).json({message: 'Servidor rodando!'});
});

// Sincronizar modelos com o banco de dados
db.sync({ alter: true }) // Sincroniza os modelos com o banco de dados
  .then(() => console.log('Modelos sincronizados com o banco de dados'))
  .catch((error) => console.error('Erro ao sincronizar modelos:', error));

export default app;
