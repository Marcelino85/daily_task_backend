import app from './app.js'; // Adicionado a extensão .js
import dotenv from 'dotenv';

dotenv.config();

// Configuração do servidor
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
